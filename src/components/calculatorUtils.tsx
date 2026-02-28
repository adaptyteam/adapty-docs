import React, { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { nanoid } from 'nanoid';

// ── Types ────────────────────────────────────────────────────────────

export interface VariableOption {
    label: string;
    value: number | string;
}

export interface Variable {
    nameInTheFormula: string;
    variableName: string;
    variableDescription: string;
    variableValue?: number;
    options?: VariableOption[];
    global?: boolean;
}

export interface RowData {
    id: string;
    values: Record<string, number | string>;
}

export interface CalculationResult {
    display: string;
    value: number | null;
    error: string | null;
}

export interface RowResult {
    readable: string;
    value: number;
}

// ── Value helpers ────────────────────────────────────────────────────

export function resolveOptionValue(value: number | string): number {
    if (typeof value === 'number') return value;
    return new Function(`return (${value})`)() as number;
}

export function optionDisplay(value: number | string): string {
    return typeof value === 'string' ? value : String(value);
}

export function resolveRawValue(rawVal: number | string | undefined | null, fallback: number): number {
    if (rawVal === '' || rawVal === undefined || rawVal === null) {
        return fallback;
    }
    const parsed = typeof rawVal === 'string' ? parseFloat(rawVal) : rawVal;
    return isNaN(parsed) ? fallback : parsed;
}

export function sanitizeNumberInput(value: string): string {
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

// ── Row helpers ──────────────────────────────────────────────────────

export function makeDefaultValues(variables: Variable[]): Record<string, number> {
    return Object.fromEntries(
        variables.map(v => [v.variableName, v.variableValue ?? 1])
    );
}

export function initializeRows(
    variables: Variable[],
    defaultRows?: Array<Record<string, number | string>>,
    count: number = 1,
): RowData[] {
    const defaults = makeDefaultValues(variables);
    if (defaultRows) {
        return defaultRows.map(overrides => {
            const resolved: Record<string, number> = {};
            for (const [key, val] of Object.entries(overrides)) {
                if (typeof val === 'string') {
                    try {
                        resolved[key] = new Function(`return (${val})`)() as number;
                    } catch {
                        resolved[key] = parseFloat(val) || 0;
                    }
                } else {
                    resolved[key] = val;
                }
            }
            return { id: nanoid(), values: { ...defaults, ...resolved } };
        });
    }
    return Array.from({ length: count }, () => ({
        id: nanoid(),
        values: { ...defaults },
    }));
}

export function createRow(variables: Variable[]): RowData {
    return { id: nanoid(), values: makeDefaultValues(variables) };
}

// ── Formula evaluation ───────────────────────────────────────────────

export function evaluateExpression(
    formulaCalculation: string,
    variableValues: Record<string, number>
): number {
    const varNames = Object.keys(variableValues);
    const varValues = Object.values(variableValues);
    const fn = new Function(...varNames, `return (${formulaCalculation})`);
    return fn(...varValues);
}

export function buildReadableExpression(
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

export function buildOptionDisplayValues(
    variables: Variable[],
    resolvedValues: Record<string, number>
): Record<string, string> {
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
    return displayValues;
}

export function roundResult(value: number): number {
    return Math.round(value * 10000) / 10000;
}

/**
 * Evaluate a formula for each row. Returns computed results per row,
 * or an error string if any row fails or produces a non-finite value.
 */
export function evaluateRows(
    rows: RowData[],
    variables: Variable[],
    formula: string,
): { results: RowResult[] } | { error: string } {
    const results: RowResult[] = [];

    for (const row of rows) {
        const resolvedValues: Record<string, number> = {};
        for (const v of variables) {
            resolvedValues[v.variableName] = resolveRawValue(
                row.values[v.variableName],
                v.variableValue ?? 1,
            );
        }

        try {
            const value = evaluateExpression(formula, resolvedValues);

            if (!isFinite(value) || isNaN(value)) {
                return { error: 'No result: division by zero' };
            }

            const displayValues = buildOptionDisplayValues(variables, resolvedValues);
            const readable = buildReadableExpression(formula, resolvedValues, displayValues);
            results.push({ readable, value });
        } catch {
            return { error: 'Calculation error' };
        }
    }

    return { results };
}

/**
 * Format row results for simple (non-compound) calculators.
 * Single row:    "expression = result"
 * Multiple rows: "(expr1) + (expr2) + ... = total"
 */
export function formatSimpleResult(rowResults: RowResult[]): { display: string; rounded: number } {
    const total = rowResults.reduce((sum, r) => sum + r.value, 0);
    const rounded = roundResult(total);

    if (rowResults.length === 1) {
        return { display: `${rowResults[0].readable} = ${rounded}`, rounded };
    }
    const parts = rowResults.map(r => `(${r.readable})`);
    return { display: `${parts.join(' + ')} = ${rounded}`, rounded };
}

/**
 * Build a sum-readable string from row results for compound formulas.
 * Single row:    just the expression
 * Multiple rows: "(expr1) + (expr2) + ..." wrapped in outer parens
 */
export function buildSumReadable(rowResults: RowResult[]): string {
    if (rowResults.length === 1) {
        return rowResults[0].readable;
    }
    const parts = rowResults.map(r => `(${r.readable})`);
    return `(${parts.join(' + ')})`;
}

// ── KaTeX rendering ──────────────────────────────────────────────────

export function renderKatexInline(latex: string): string {
    try {
        return katex.renderToString(latex, { throwOnError: false });
    } catch {
        return latex;
    }
}

// ── Dark-mode hook & style helpers ───────────────────────────────────

export function useDarkMode(): boolean {
    const [isDark, setIsDark] = useState(false);

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

    return isDark;
}

export function getInputStyle(isDark: boolean): React.CSSProperties {
    return {
        backgroundColor: isDark ? 'rgba(24, 24, 27, 0.7)' : '#ffffff',
        borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
        color: isDark ? '#f1f5f9' : '#0a0a0a',
    };
}

export function getCardStyle(isDark: boolean): React.CSSProperties {
    return {
        backgroundColor: isDark ? 'rgba(39, 39, 42, 0.4)' : '#ffffff',
        borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#f3f4f6',
        boxShadow: isDark ? 'none' : undefined,
    };
}

export function getFormulaBoxStyle(isDark: boolean): React.CSSProperties {
    return {
        backgroundColor: isDark ? 'rgba(24, 24, 27, 0.5)' : 'rgba(249, 250, 251, 0.5)',
        borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#f3f4f6',
    };
}

export const getButtonStyle = getInputStyle;

export function getAddButtonStyle(isDark: boolean): React.CSSProperties {
    return {
        backgroundColor: isDark ? 'rgba(24, 24, 27, 0.5)' : '#f9fafb',
        borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
        color: isDark ? '#d1d5db' : '#4b5563',
    };
}

export function getResultStyle(isDark: boolean): React.CSSProperties {
    return {
        backgroundColor: isDark ? 'rgba(24, 24, 27, 0.6)' : '#f9fafb',
        borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
        color: isDark ? '#e2e8f0' : '#1f2937',
    };
}

export function getErrorStyle(isDark: boolean): React.CSSProperties {
    return {
        backgroundColor: isDark ? 'rgba(127, 29, 29, 0.3)' : '#fef2f2',
        borderColor: isDark ? 'rgba(153, 27, 27, 0.5)' : '#fecaca',
        color: isDark ? '#fca5a5' : '#991b1b',
    };
}

export function getHeadingColor(isDark: boolean): string {
    return isDark ? '#f1f5f9' : '#0a0a0a';
}

export function getLabelColor(isDark: boolean): string {
    return isDark ? '#e2e8f0' : '#0a0a0a';
}

export function getSubtextColor(isDark: boolean): string {
    return isDark ? '#cbd5e1' : '#374151';
}

export function getColumnHeaderColor(isDark: boolean): string {
    return isDark ? '#cbd5e1' : '#4b5563';
}

// ── Hooks ────────────────────────────────────────────────────────────

export function useInitialCalculation(calculate: () => void): void {
    const ran = useRef(false);
    useEffect(() => {
        if (!ran.current) {
            ran.current = true;
            calculate();
        }
    }, []);
}

// ── Shared sub-components ────────────────────────────────────────────

const RemoveRowIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
);

const AddRowIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" /><path d="M12 5v14" />
    </svg>
);

export const VariableInput: React.FC<{
    variable: Variable;
    value: number | string;
    onChange: (value: string) => void;
    isDark: boolean;
    className?: string;
}> = ({ variable, value, onChange, isDark, className = 'w-32' }) => {
    const style = getInputStyle(isDark);
    const cls = `${className} px-2.5 py-1.5 text-sm rounded-md shadow-sm border outline-none transition-all focus:ring-1`;

    if (variable.options) {
        return (
            <div className={`${className} relative`}>
                <select value={value} onChange={(e) => onChange(e.target.value)} className={`w-full px-2.5 pr-7 py-1.5 text-sm rounded-md shadow-sm border outline-none transition-all appearance-none cursor-pointer focus:ring-1`} style={style}>
                    {variable.options.map(opt => (
                        <option key={String(opt.value)} value={resolveOptionValue(opt.value)}>{opt.label}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <input
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onDoubleClick={(e) => e.currentTarget.select()}
            className={cls}
            style={style}
        />
    );
};

export const LabeledVariableInput: React.FC<{
    variable: Variable;
    value: number | string;
    onChange: (value: string) => void;
    isDark: boolean;
    centered?: boolean;
}> = ({ variable, value, onChange, isDark, centered }) => (
    <div className={`flex items-center gap-3${centered ? ' justify-center' : ''}`}>
        <VariableInput
            variable={variable}
            value={value}
            onChange={onChange}
            isDark={isDark}
            className="w-24"
        />
        <span
            className="calculator-formula text-sm font-medium shrink-0"
            style={{ color: getLabelColor(isDark) }}
            dangerouslySetInnerHTML={{ __html: renderKatexInline(variable.nameInTheFormula) }}
        />
        <span className="text-sm" style={{ color: getSubtextColor(isDark) }}>
            {variable.variableDescription}
        </span>
    </div>
);

export const ColumnHeaders: React.FC<{
    variables: Variable[];
    isDark: boolean;
}> = ({ variables, isDark }) => (
    <div className="flex items-end gap-2">
        {variables.map(v => (
            <div key={v.variableName} className="w-32 text-sm text-center" style={{ color: getColumnHeaderColor(isDark) }}>
                <span
                    className="calculator-formula font-medium"
                    style={{ color: getLabelColor(isDark) }}
                    dangerouslySetInnerHTML={{ __html: renderKatexInline(v.nameInTheFormula) }}
                />
                <span className="ml-0.5">{v.variableDescription}</span>
            </div>
        ))}
        <div className="w-8 shrink-0" />
    </div>
);

export const RowGrid: React.FC<{
    rows: RowData[];
    variables: Variable[];
    isDark: boolean;
    onUpdateValue: (rowId: string, variableName: string, value: string) => void;
    onAddRow: () => void;
    onRemoveRow: (id: string) => void;
}> = ({ rows, variables, isDark, onUpdateValue, onAddRow, onRemoveRow }) => (
    <div className="space-y-2 flex flex-col items-center">
        <ColumnHeaders variables={variables} isDark={isDark} />

        {rows.map((row, rowIndex) => (
            <div key={row.id}>
                <div className="flex items-center gap-2">
                    {variables.map(v => (
                        <VariableInput
                            key={v.variableName}
                            variable={v}
                            value={row.values[v.variableName]}
                            onChange={(val) => onUpdateValue(row.id, v.variableName, val)}
                            isDark={isDark}
                        />
                    ))}
                    <div className="w-8 shrink-0 flex items-center justify-center">
                        {rowIndex > 0 && (
                            <button
                                onClick={() => onRemoveRow(row.id)}
                                className="p-1.5 rounded-md transition-colors cursor-pointer"
                                style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
                                title="Remove row"
                            >
                                <RemoveRowIcon />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        ))}

        <div className="flex justify-center">
            <button
                onClick={onAddRow}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md font-medium transition-colors border"
                style={getAddButtonStyle(isDark)}
            >
                <AddRowIcon />
                Add
            </button>
        </div>
    </div>
);

export const ResultSection: React.FC<{
    result: CalculationResult | null;
    isDark: boolean;
    onCalculate: () => void;
}> = ({ result, isDark, onCalculate }) => (
    <div className="flex flex-col items-center">
        <button
            onClick={onCalculate}
            className="w-full py-2.5 px-4 font-medium text-sm rounded-lg border shadow-sm transition-all active:scale-[0.98]"
            style={getButtonStyle(isDark)}
        >
            Calculate
        </button>
        {result && (
            <div className="mt-4 w-full">
                {result.error ? (
                    <div
                        className="py-3 px-4 rounded-lg shadow-sm border text-sm font-medium text-center"
                        style={getErrorStyle(isDark)}
                    >
                        {result.error}
                    </div>
                ) : (
                    <div
                        className="py-3 px-4 rounded-lg shadow-sm border font-mono text-sm overflow-x-auto"
                        style={getResultStyle(isDark)}
                    >
                        {result.display}
                    </div>
                )}
            </div>
        )}
    </div>
);

export const CalculatorWrapper: React.FC<{
    heading?: string;
    formuLatex: string;
    isDark: boolean;
    children: React.ReactNode;
}> = ({ heading, formuLatex, isDark, children }) => {
    const headerFormulaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (headerFormulaRef.current && formuLatex) {
            katex.render(formuLatex, headerFormulaRef.current, {
                throwOnError: false,
                displayMode: true,
            });
        }
    }, [formuLatex]);

    return (
        <div
            className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-5 md:p-6 max-w-xl mx-auto my-6 border"
            style={getCardStyle(isDark)}
        >
            {heading && (
                <h4
                    className="text-base font-semibold mb-3 mt-0 text-center"
                    style={{ color: getHeadingColor(isDark) }}
                >
                    {heading}
                </h4>
            )}
            <div
                className="rounded-lg p-4 mb-6 flex items-center justify-center border"
                style={getFormulaBoxStyle(isDark)}
            >
                <div
                    ref={headerFormulaRef}
                    className="text-base md:text-lg calculator-formula"
                    style={{ color: getHeadingColor(isDark) }}
                />
            </div>
            {children}
        </div>
    );
};
