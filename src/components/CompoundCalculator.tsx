import React, { useState } from 'react';
import {
    type Variable,
    type RowData,
    type CalculationResult,
    sanitizeNumberInput,
    makeDefaultValues,
    useDarkMode,
    renderKatexInline,
    evaluateExpression,
    buildReadableExpression,
    buildOptionDisplayValues,
    resolveRawValue,
    initializeRows,
    createRow,
    evaluateRows,
    buildSumReadable,
    roundResult,
    useInitialCalculation,
    VariableInput,
    RowGrid,
    ResultSection,
    CalculatorWrapper,
    getLabelColor,
    getSubtextColor,
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

    const [rows, setRows] = useState<RowData[]>(() => initializeRows(rowVariables, defaultRows));
    const [globalValues, setGlobalValues] = useState<Record<string, number | string>>(() =>
        makeDefaultValues(globalVariables)
    );
    const [result, setResult] = useState<CalculationResult | null>(null);
    const isDark = useDarkMode();

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

    const addRow = () => setRows(prev => [...prev, createRow(rowVariables)]);
    const removeRow = (id: string) => setRows(prev => prev.filter(r => r.id !== id));

    const handleCalculate = () => {
        // Evaluate per-row formula and sum
        const evalResult = evaluateRows(rows, rowVariables, rowFormula);
        if ('error' in evalResult) {
            setResult({ display: '', value: null, error: evalResult.error });
            return;
        }
        const sumValue = evalResult.results.reduce((s, r) => s + r.value, 0);

        // Resolve global variable values
        const resolvedGlobals: Record<string, number> = {};
        for (const v of globalVariables) {
            resolvedGlobals[v.variableName] = resolveRawValue(globalValues[v.variableName], v.variableValue ?? 1);
        }

        // Evaluate the outer formula with _sum + globals, build display
        try {
            const outerValues = { _sum: sumValue, ...resolvedGlobals };
            const finalValue = evaluateExpression(resultFormula, outerValues);

            if (!isFinite(finalValue) || isNaN(finalValue)) {
                setResult({ display: '', value: null, error: 'No result: division by zero' });
                return;
            }

            const rounded = roundResult(finalValue);
            const sumReadable = buildSumReadable(evalResult.results);
            const globalDisplayValues = buildOptionDisplayValues(globalVariables, resolvedGlobals);
            const outerDisplayValues: Record<string, string> = { _sum: sumReadable, ...globalDisplayValues };
            const display = buildReadableExpression(resultFormula, outerValues, outerDisplayValues) + ` = ${rounded}`;

            setResult({ display, value: rounded, error: null });
        } catch {
            setResult({ display: '', value: null, error: 'Calculation error' });
        }
    };

    useInitialCalculation(handleCalculate);

    return (
        <CalculatorWrapper heading={heading} formuLatex={formuLatex} isDark={isDark}>
            <div className="mb-6">
                <RowGrid
                    rows={rows}
                    variables={rowVariables}
                    isDark={isDark}
                    onUpdateValue={updateRowValue}
                    onAddRow={addRow}
                    onRemoveRow={removeRow}
                />

                {/* Global variable inputs */}
                <div
                    className="mt-4 pt-4 border-t space-y-3"
                    style={{ borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb' }}
                >
                    {globalVariables.map(v => (
                        <div key={v.variableName} className="flex items-center justify-center gap-3">
                            <VariableInput
                                variable={v}
                                value={globalValues[v.variableName]}
                                onChange={(val) => updateGlobalValue(v.variableName, val)}
                                isDark={isDark}
                                className="w-24"
                            />
                            <span
                                className="calculator-formula text-sm font-medium shrink-0"
                                style={{ color: getLabelColor(isDark) }}
                                dangerouslySetInnerHTML={{ __html: renderKatexInline(v.nameInTheFormula) }}
                            />
                            <span className="text-sm" style={{ color: getSubtextColor(isDark) }}>
                                {v.variableDescription}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <ResultSection result={result} isDark={isDark} onCalculate={handleCalculate} />
        </CalculatorWrapper>
    );
};
