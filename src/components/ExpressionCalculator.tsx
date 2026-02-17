import React, { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { nanoid } from 'nanoid';

interface VariableOption {
    label: string;
    value: number | string;
}

function resolveOptionValue(value: number | string): number {
    if (typeof value === 'number') return value;
    return new Function(`return (${value})`)() as number;
}

function optionDisplay(value: number | string): string {
    return typeof value === 'string' ? value : String(value);
}

interface Variable {
    nameInTheFormula: string;
    variableName: string;
    variableDescription: string;
    variableValue?: number;
    options?: VariableOption[];
}

interface RowData {
    id: string;
    values: Record<string, number | string>;
}

interface CalculationResult {
    display: string;
    value: number | null;
    error: string | null;
}

interface ExpressionCalculatorProps {
    heading?: string;
    formuLatex: string;
    variables: Variable[];
    formulaCalculation: string;
    isSum?: boolean;
    defaultRowCount?: number;
    defaultRows?: Array<Record<string, number>>;
}

function makeDefaultValues(variables: Variable[]): Record<string, number> {
    return Object.fromEntries(
        variables.map(v => [v.variableName, v.variableValue ?? 1])
    );
}

function evaluateExpression(
    formulaCalculation: string,
    variableValues: Record<string, number>
): number {
    const varNames = Object.keys(variableValues);
    const varValues = Object.values(variableValues);
    const fn = new Function(...varNames, `return (${formulaCalculation})`);
    return fn(...varValues);
}

function buildReadableExpression(
    formulaCalculation: string,
    variableValues: Record<string, number>,
    displayValues?: Record<string, string>
): string {
    // Replace / operators with ÷ before substituting values,
    // so fraction displays like "1/12" keep their internal /
    let readable = formulaCalculation.replace(/\//g, '÷');
    const sortedNames = Object.keys(variableValues)
        .sort((a, b) => b.length - a.length);
    for (const name of sortedNames) {
        const regex = new RegExp(`\\b${name}\\b`, 'g');
        readable = readable.replace(regex, displayValues?.[name] ?? String(variableValues[name]));
    }
    return readable;
}

function sanitizeNumberInput(value: string): string {
    let sanitized = value.replace(/,/g, '.');
    // Allow digits, one decimal point, and leading minus
    sanitized = sanitized.replace(/[^\d.\-]/g, '');
    // Only allow minus at the start
    if (sanitized.indexOf('-') > 0) {
        sanitized = sanitized.replace(/-/g, '');
    }
    // Ensure only one decimal point
    const parts = sanitized.split('.');
    if (parts.length > 2) {
        sanitized = parts[0] + '.' + parts.slice(1).join('');
    }
    return sanitized;
}

export const ExpressionCalculator: React.FC<ExpressionCalculatorProps> = ({
    heading,
    formuLatex,
    variables,
    formulaCalculation,
    isSum = false,
    defaultRowCount,
    defaultRows,
}) => {
    const [rows, setRows] = useState<RowData[]>(() => {
        const defaults = makeDefaultValues(variables);
        if (!isSum) {
            return [{ id: nanoid(), values: defaults }];
        }
        if (defaultRows) {
            return defaultRows.map(overrides => ({
                id: nanoid(),
                values: { ...defaults, ...overrides },
            }));
        }
        const count = defaultRowCount ?? 1;
        return Array.from({ length: count }, () => ({
            id: nanoid(),
            values: { ...defaults },
        }));
    });
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [isDark, setIsDark] = useState(false);

    const headerFormulaRef = useRef<HTMLDivElement>(null);

    // Dark mode detection
    useEffect(() => {
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        checkDarkMode();
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => observer.disconnect();
    }, []);

    // Render header formula
    useEffect(() => {
        if (headerFormulaRef.current && formuLatex) {
            katex.render(formuLatex, headerFormulaRef.current, {
                throwOnError: false,
                displayMode: true,
            });
        }
    }, [formuLatex]);

    const renderKatexInline = (latex: string) => {
        try {
            return katex.renderToString(latex, { throwOnError: false });
        } catch {
            return latex;
        }
    };

    const updateValue = (rowId: string, variableName: string, value: string) => {
        setRows(prev =>
            prev.map(r =>
                r.id === rowId
                    ? { ...r, values: { ...r.values, [variableName]: sanitizeNumberInput(value) } }
                    : r
            )
        );
    };

    const addRow = () => {
        setRows(prev => [
            ...prev,
            { id: nanoid(), values: makeDefaultValues(variables) },
        ]);
    };

    const removeRow = (id: string) => {
        setRows(prev => prev.filter(r => r.id !== id));
    };

    const handleCalculate = () => {
        const rowResults: { readable: string; value: number }[] = [];

        for (const row of rows) {
            const resolvedValues: Record<string, number> = {};
            for (const v of variables) {
                const rawVal = row.values[v.variableName];
                if (rawVal === '' || rawVal === undefined || rawVal === null) {
                    resolvedValues[v.variableName] = v.variableValue ?? 1;
                } else {
                    const parsed = typeof rawVal === 'string' ? parseFloat(rawVal) : rawVal;
                    resolvedValues[v.variableName] = isNaN(parsed) ? (v.variableValue ?? 1) : parsed;
                }
            }

            try {
                const value = evaluateExpression(formulaCalculation, resolvedValues);

                if (!isFinite(value) || isNaN(value)) {
                    setResult({ display: '', value: null, error: 'No result: division by zero' });
                    return;
                }

                const displayValues: Record<string, string> = {};
                for (const v of variables) {
                    if (v.options) {
                        const numVal = resolvedValues[v.variableName];
                        const match = v.options.find(opt => Math.abs(resolveOptionValue(opt.value) - numVal) < 1e-10);
                        if (match) {
                            displayValues[v.variableName] = optionDisplay(match.value);
                        }
                    }
                }
                const readable = buildReadableExpression(formulaCalculation, resolvedValues, displayValues);
                rowResults.push({ readable, value });
            } catch {
                setResult({ display: '', value: null, error: 'Calculation error' });
                return;
            }
        }

        const total = rowResults.reduce((sum, r) => sum + r.value, 0);
        const roundedTotal = Math.round(total * 10000) / 10000;

        let display: string;
        if (rowResults.length === 1) {
            display = `${rowResults[0].readable} = ${roundedTotal}`;
        } else {
            const parts = rowResults.map(r => `(${r.readable})`);
            display = `${parts.join(' + ')} = ${roundedTotal}`;
        }

        setResult({ display, value: roundedTotal, error: null });
    };

    // Calculate once on mount with default values
    const initialCalculated = useRef(false);
    useEffect(() => {
        if (!initialCalculated.current) {
            initialCalculated.current = true;
            handleCalculate();
        }
    }, []);

    return (
        <div
            className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-5 md:p-6 max-w-xl mx-auto my-6 border"
            style={{
                backgroundColor: isDark ? 'rgba(39, 39, 42, 0.4)' : '#ffffff',
                borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#f3f4f6',
                boxShadow: isDark ? 'none' : undefined,
            }}
        >
            {/* Heading */}
            {heading && (
                <h4
                    className="text-base font-semibold mb-3 mt-0 text-center"
                    style={{ color: isDark ? '#f1f5f9' : '#0a0a0a' }}
                >
                    {heading}
                </h4>
            )}

            {/* Header Formula */}
            <div
                className="rounded-lg p-4 mb-6 flex items-center justify-center border"
                style={{
                    backgroundColor: isDark ? 'rgba(24, 24, 27, 0.5)' : 'rgba(249, 250, 251, 0.5)',
                    borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#f3f4f6',
                }}
            >
                <div
                    ref={headerFormulaRef}
                    className="text-base md:text-lg calculator-formula"
                    style={{ color: isDark ? '#f1f5f9' : '#0a0a0a' }}
                />
            </div>

            {/* Variable inputs */}
            <div className="mb-6">
                {!isSum ? (
                    // Non-sum: vertical layout
                    <div className="space-y-3">
                        {variables.map(v => (
                            <div key={v.variableName} className="flex items-center gap-3">
                                {v.options ? (
                                    <select
                                        value={rows[0].values[v.variableName]}
                                        onChange={(e) => updateValue(rows[0].id, v.variableName, e.target.value)}
                                        className="w-24 px-2.5 py-1.5 text-sm rounded-md shadow-sm border outline-none transition-all focus:ring-1"
                                        style={{
                                            backgroundColor: isDark ? 'rgba(24, 24, 27, 0.7)' : '#ffffff',
                                            borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
                                            color: isDark ? '#f1f5f9' : '#0a0a0a',
                                        }}
                                    >
                                        {v.options.map(opt => (
                                            <option key={String(opt.value)} value={resolveOptionValue(opt.value)}>{opt.label}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={rows[0].values[v.variableName]}
                                        onChange={(e) => updateValue(rows[0].id, v.variableName, e.target.value)}
                                        onDoubleClick={(e) => e.currentTarget.select()}
                                        className="w-24 px-2.5 py-1.5 text-sm rounded-md shadow-sm border outline-none transition-all focus:ring-1"
                                        style={{
                                            backgroundColor: isDark ? 'rgba(24, 24, 27, 0.7)' : '#ffffff',
                                            borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
                                            color: isDark ? '#f1f5f9' : '#0a0a0a',
                                        }}
                                    />
                                )}
                                <span
                                    className="calculator-formula text-sm font-medium shrink-0"
                                    style={{ color: isDark ? '#e2e8f0' : '#0a0a0a' }}
                                    dangerouslySetInnerHTML={{ __html: renderKatexInline(v.nameInTheFormula) }}
                                />
                                <span className="text-sm" style={{ color: isDark ? '#cbd5e1' : '#374151' }}>
                                    {v.variableDescription}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Sum mode: horizontal rows
                    <div className="space-y-2 flex flex-col items-center">
                        {/* Column headers — shown once above all rows */}
                        <div className="flex items-end gap-2">
                            {variables.map(v => (
                                <div key={v.variableName} className="w-32 text-sm text-center" style={{ color: isDark ? '#cbd5e1' : '#4b5563' }}>
                                    <span
                                        className="calculator-formula font-medium"
                                        style={{ color: isDark ? '#e2e8f0' : '#0a0a0a' }}
                                        dangerouslySetInnerHTML={{ __html: renderKatexInline(v.nameInTheFormula) }}
                                    />
                                    <span className="ml-0.5">{v.variableDescription}</span>
                                </div>
                            ))}
                            <div className="w-8 shrink-0" />
                        </div>
                        {rows.map((row, rowIndex) => (
                            <div key={row.id}>
                                <div className="flex items-center gap-2">
                                    {variables.map(v => (
                                        v.options ? (
                                            <select
                                                key={v.variableName}
                                                value={row.values[v.variableName]}
                                                onChange={(e) => updateValue(row.id, v.variableName, e.target.value)}
                                                className="w-32 px-2.5 py-1.5 text-sm rounded-md shadow-sm border outline-none transition-all focus:ring-1"
                                                style={{
                                                    backgroundColor: isDark ? 'rgba(24, 24, 27, 0.7)' : '#ffffff',
                                                    borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
                                                    color: isDark ? '#f1f5f9' : '#0a0a0a',
                                                }}
                                            >
                                                {v.options.map(opt => (
                                                    <option key={String(opt.value)} value={resolveOptionValue(opt.value)}>{opt.label}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                key={v.variableName}
                                                type="text"
                                                inputMode="decimal"
                                                value={row.values[v.variableName]}
                                                onChange={(e) => updateValue(row.id, v.variableName, e.target.value)}
                                                onDoubleClick={(e) => e.currentTarget.select()}
                                                className="w-32 px-2.5 py-1.5 text-sm rounded-md shadow-sm border outline-none transition-all focus:ring-1"
                                                style={{
                                                    backgroundColor: isDark ? 'rgba(24, 24, 27, 0.7)' : '#ffffff',
                                                    borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
                                                    color: isDark ? '#f1f5f9' : '#0a0a0a',
                                                }}
                                            />
                                        )
                                    ))}
                                    <div className="w-8 shrink-0 flex items-center justify-center">
                                        {rowIndex > 0 && (
                                            <button
                                                onClick={() => removeRow(row.id)}
                                                className="p-1.5 rounded-md transition-colors cursor-pointer"
                                                style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
                                                title="Remove row"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-center">
                            <button
                                onClick={addRow}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md font-medium transition-colors border"
                                style={{
                                    backgroundColor: isDark ? 'rgba(24, 24, 27, 0.5)' : '#f9fafb',
                                    borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
                                    color: isDark ? '#d1d5db' : '#4b5563',
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                Add
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Calculate + Result */}
            <div className="flex flex-col items-center">
                <button
                    onClick={handleCalculate}
                    className="w-full py-2.5 px-4 font-medium text-sm rounded-lg border shadow-sm transition-all active:scale-[0.98]"
                    style={{
                        backgroundColor: isDark ? 'rgba(24, 24, 27, 0.7)' : '#ffffff',
                        borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
                        color: isDark ? '#f1f5f9' : '#0a0a0a',
                    }}
                >
                    Calculate
                </button>
                {result && (
                    <div className="mt-4 w-full">
                        {result.error ? (
                            <div
                                className="py-3 px-4 rounded-lg shadow-sm border text-sm font-medium text-center"
                                style={{
                                    backgroundColor: isDark ? 'rgba(127, 29, 29, 0.3)' : '#fef2f2',
                                    borderColor: isDark ? 'rgba(153, 27, 27, 0.5)' : '#fecaca',
                                    color: isDark ? '#fca5a5' : '#991b1b',
                                }}
                            >
                                {result.error}
                            </div>
                        ) : (
                            <div
                                className="py-3 px-4 rounded-lg shadow-sm border font-mono text-sm overflow-x-auto"
                                style={{
                                    backgroundColor: isDark ? 'rgba(24, 24, 27, 0.6)' : '#f9fafb',
                                    borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
                                    color: isDark ? '#e2e8f0' : '#1f2937',
                                }}
                            >
                                {result.display}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};
