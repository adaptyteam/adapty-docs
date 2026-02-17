import { useState, useEffect } from 'react';
import katex from 'katex';

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

export function resolveOptionValue(value: number | string): number {
    if (typeof value === 'number') return value;
    return new Function(`return (${value})`)() as number;
}

export function optionDisplay(value: number | string): string {
    return typeof value === 'string' ? value : String(value);
}

export function makeDefaultValues(variables: Variable[]): Record<string, number> {
    return Object.fromEntries(
        variables.map(v => [v.variableName, v.variableValue ?? 1])
    );
}

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

export function renderKatexInline(latex: string): string {
    try {
        return katex.renderToString(latex, { throwOnError: false });
    } catch {
        return latex;
    }
}

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

export function resolveRawValue(rawVal: number | string | undefined | null, fallback: number): number {
    if (rawVal === '' || rawVal === undefined || rawVal === null) {
        return fallback;
    }
    const parsed = typeof rawVal === 'string' ? parseFloat(rawVal) : rawVal;
    return isNaN(parsed) ? fallback : parsed;
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
