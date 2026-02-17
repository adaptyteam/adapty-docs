import React, { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { nanoid } from 'nanoid';
import {
    type Variable,
    type RowData,
    type CalculationResult,
    resolveOptionValue,
    makeDefaultValues,
    evaluateExpression,
    buildReadableExpression,
    sanitizeNumberInput,
    renderKatexInline,
    useDarkMode,
    resolveRawValue,
    buildOptionDisplayValues,
} from './calculatorUtils';

interface CompoundCalculatorProps {
    heading?: string;
    formuLatex: string;
    variables: Variable[];
    rowFormula: string;
    resultFormula: string;
    defaultRows?: Array<Record<string, number>>;
}

export const CompoundCalculator: React.FC<CompoundCalculatorProps> = ({
    heading,
    formuLatex,
    variables,
    rowFormula,
    resultFormula,
    defaultRows,
}) => {
    const rowVariables = variables.filter(v => !v.global);
    const globalVariables = variables.filter(v => v.global);

    const [rows, setRows] = useState<RowData[]>(() => {
        const defaults = makeDefaultValues(rowVariables);
        if (defaultRows) {
            return defaultRows.map(overrides => ({
                id: nanoid(),
                values: { ...defaults, ...overrides },
            }));
        }
        return [{ id: nanoid(), values: defaults }];
    });
    const [globalValues, setGlobalValues] = useState<Record<string, number | string>>(() =>
        makeDefaultValues(globalVariables)
    );
    const [result, setResult] = useState<CalculationResult | null>(null);
    const isDark = useDarkMode();

    const headerFormulaRef = useRef<HTMLDivElement>(null);

    // Render header formula
    useEffect(() => {
        if (headerFormulaRef.current && formuLatex) {
            katex.render(formuLatex, headerFormulaRef.current, {
                throwOnError: false,
                displayMode: true,
            });
        }
    }, [formuLatex]);

    const updateRowValue = (rowId: string, variableName: string, value: string) => {
        setRows(prev =>
            prev.map(r =>
                r.id === rowId
                    ? { ...r, values: { ...r.values, [variableName]: sanitizeNumberInput(value) } }
                    : r
            )
        );
    };

    const updateGlobalValue = (variableName: string, value: string) => {
        setGlobalValues(prev => ({ ...prev, [variableName]: sanitizeNumberInput(value) }));
    };

    const addRow = () => {
        setRows(prev => [
            ...prev,
            { id: nanoid(), values: makeDefaultValues(rowVariables) },
        ]);
    };

    const removeRow = (id: string) => {
        setRows(prev => prev.filter(r => r.id !== id));
    };

    const handleCalculate = () => {
        // Step 1: Evaluate rowFormula per row
        const rowResults: { readable: string; value: number }[] = [];

        for (const row of rows) {
            const resolvedRowValues: Record<string, number> = {};
            for (const v of rowVariables) {
                resolvedRowValues[v.variableName] = resolveRawValue(row.values[v.variableName], v.variableValue ?? 1);
            }

            try {
                const value = evaluateExpression(rowFormula, resolvedRowValues);

                if (!isFinite(value) || isNaN(value)) {
                    setResult({ display: '', value: null, error: 'No result: division by zero' });
                    return;
                }

                const displayValues = buildOptionDisplayValues(rowVariables, resolvedRowValues);
                const readable = buildReadableExpression(rowFormula, resolvedRowValues, displayValues);
                rowResults.push({ readable, value });
            } catch {
                setResult({ display: '', value: null, error: 'Calculation error' });
                return;
            }
        }

        // Step 2: Sum row results
        const sumValue = rowResults.reduce((sum, r) => sum + r.value, 0);

        // Step 3: Resolve global values
        const resolvedGlobals: Record<string, number> = {};
        for (const v of globalVariables) {
            resolvedGlobals[v.variableName] = resolveRawValue(globalValues[v.variableName], v.variableValue ?? 1);
        }

        // Step 4: Evaluate outer formula
        try {
            const outerValues = { _sum: sumValue, ...resolvedGlobals };
            const finalValue = evaluateExpression(resultFormula, outerValues);

            if (!isFinite(finalValue) || isNaN(finalValue)) {
                setResult({ display: '', value: null, error: 'No result: division by zero' });
                return;
            }

            const roundedTotal = Math.round(finalValue * 10000) / 10000;

            // Step 5: Build display
            const rowParts = rowResults.map(r => `(${r.readable})`);
            const sumReadable = rowResults.length === 1
                ? rowResults[0].readable
                : `(${rowParts.join(' + ')})`;

            const globalDisplayValues = buildOptionDisplayValues(globalVariables, resolvedGlobals);
            const outerDisplayValues: Record<string, string> = {
                _sum: sumReadable,
                ...globalDisplayValues,
            };
            const display = buildReadableExpression(resultFormula, outerValues, outerDisplayValues) + ` = ${roundedTotal}`;

            setResult({ display, value: roundedTotal, error: null });
        } catch {
            setResult({ display: '', value: null, error: 'Calculation error' });
        }
    };

    // Calculate once on mount
    const initialCalculated = useRef(false);
    useEffect(() => {
        if (!initialCalculated.current) {
            initialCalculated.current = true;
            handleCalculate();
        }
    }, []);

    const inputStyle = {
        backgroundColor: isDark ? 'rgba(24, 24, 27, 0.7)' : '#ffffff',
        borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
        color: isDark ? '#f1f5f9' : '#0a0a0a',
    };

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

            <div className="mb-6">
                {/* Sum rows */}
                <div className="space-y-2 flex flex-col items-center">
                    {/* Column headers */}
                    <div className="flex items-end gap-2">
                        {rowVariables.map(v => (
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

                    {/* Data rows */}
                    {rows.map((row, rowIndex) => (
                        <div key={row.id}>
                            <div className="flex items-center gap-2">
                                {rowVariables.map(v => (
                                    v.options ? (
                                        <select
                                            key={v.variableName}
                                            value={row.values[v.variableName]}
                                            onChange={(e) => updateRowValue(row.id, v.variableName, e.target.value)}
                                            className="w-32 px-2.5 py-1.5 text-sm rounded-md shadow-sm border outline-none transition-all focus:ring-1"
                                            style={inputStyle}
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
                                            onChange={(e) => updateRowValue(row.id, v.variableName, e.target.value)}
                                            onDoubleClick={(e) => e.currentTarget.select()}
                                            className="w-32 px-2.5 py-1.5 text-sm rounded-md shadow-sm border outline-none transition-all focus:ring-1"
                                            style={inputStyle}
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

                {/* Global variable inputs */}
                <div
                    className="mt-4 pt-4 border-t space-y-3"
                    style={{ borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb' }}
                >
                    {globalVariables.map(v => (
                        <div key={v.variableName} className="flex items-center justify-center gap-3">
                            {v.options ? (
                                <select
                                    value={globalValues[v.variableName]}
                                    onChange={(e) => updateGlobalValue(v.variableName, e.target.value)}
                                    className="w-24 px-2.5 py-1.5 text-sm rounded-md shadow-sm border outline-none transition-all focus:ring-1"
                                    style={inputStyle}
                                >
                                    {v.options.map(opt => (
                                        <option key={String(opt.value)} value={resolveOptionValue(opt.value)}>{opt.label}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={globalValues[v.variableName]}
                                    onChange={(e) => updateGlobalValue(v.variableName, e.target.value)}
                                    onDoubleClick={(e) => e.currentTarget.select()}
                                    className="w-24 px-2.5 py-1.5 text-sm rounded-md shadow-sm border outline-none transition-all focus:ring-1"
                                    style={inputStyle}
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
