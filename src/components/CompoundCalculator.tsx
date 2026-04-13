import React, { useState } from 'react';
import {
    type Variable,
    type RowData,
    type CalculationResult,
    sanitizeNumberInput,
    sanitizeIntegerInput,
    makeDefaultValues,
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
    renderKatexInline,
    RowGrid,
    ResultSection,
    CalculatorWrapper,
} from './calculatorUtils';

interface CompoundCalculatorProps {
    heading?: string;
    formuLatex: string;
    variables: Variable[];
    rowFormula: string;
    resultFormula: string;
    defaultRows?: Array<Record<string, number | string>>;
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

    const updateRowValue = (rowId: string, variableName: string, value: string) => {
        const variable = variables.find(v => v.variableName === variableName);
        const sanitized = variable?.isInteger ? sanitizeIntegerInput(value) : sanitizeNumberInput(value);
        setRows(prev =>
            prev.map(r =>
                r.id === rowId
                    ? { ...r, values: { ...r.values, [variableName]: sanitized } }
                    : r
            )
        );
    };

    const updateGlobalValue = (variableName: string, value: string) => {
        const variable = globalVariables.find(v => v.variableName === variableName);
        const sanitized = variable?.isInteger ? sanitizeIntegerInput(value) : sanitizeNumberInput(value);
        setGlobalValues(prev => ({ ...prev, [variableName]: sanitized }));
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
            const display = buildReadableExpression(resultFormula, outerValues, outerDisplayValues);

            setResult({ display, value: rounded, error: null });
        } catch {
            setResult({ display: '', value: null, error: 'Calculation error' });
        }
    };

    useInitialCalculation(handleCalculate);

    return (
        <CalculatorWrapper heading={heading} formuLatex={formuLatex}>
            <div className="mb-6">
                <RowGrid
                    rows={rows}
                    variables={rowVariables}
                    onUpdateValue={updateRowValue}
                    onAddRow={addRow}
                    onRemoveRow={removeRow}
                />

                {/* Global variable inputs */}
                <div className="mt-4 pt-4 border-t flex flex-col items-center border-gray-200 dark:border-zinc-700/50">
                    <div className="grid gap-y-3 gap-x-3 grid-cols-[auto_auto_auto] items-center">
                        {globalVariables.map(v => (
                            <React.Fragment key={v.variableName}>
                                <VariableInput
                                    variable={v}
                                    value={globalValues[v.variableName]}
                                    onChange={(val) => updateGlobalValue(v.variableName, val)}
                                    className="w-24"
                                />
                                <span
                                    className="calculator-formula text-sm font-medium shrink-0 text-zinc-950 dark:text-slate-200"
                                    dangerouslySetInnerHTML={{ __html: renderKatexInline(v.nameInTheFormula) }}
                                />
                                <span className="text-sm text-gray-700 dark:text-slate-300">
                                    {v.variableDescription}
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
            <ResultSection result={result} onCalculate={handleCalculate} />
        </CalculatorWrapper>
    );
};
