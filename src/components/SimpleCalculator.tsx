import React, { useState } from 'react';
import {
    type Variable,
    type RowData,
    type CalculationResult,
    sanitizeNumberInput,
    useDarkMode,
    initializeRows,
    createRow,
    evaluateRows,
    formatSimpleResult,
    useInitialCalculation,
    LabeledVariableInput,
    RowGrid,
    ResultSection,
    CalculatorWrapper,
} from './calculatorUtils';

interface SimpleCalculatorProps {
    heading?: string;
    formuLatex: string;
    variables: Variable[];
    formulaCalculation: string;
    isSum?: boolean;
    defaultRowCount?: number;
    defaultRows?: Array<Record<string, number | string>>;
}

export const SimpleCalculator: React.FC<SimpleCalculatorProps> = ({
    heading,
    formuLatex,
    variables,
    formulaCalculation,
    isSum = false,
    defaultRowCount,
    defaultRows,
}) => {
    const [rows, setRows] = useState<RowData[]>(() =>
        initializeRows(variables, defaultRows, isSum ? (defaultRowCount ?? 1) : 1)
    );
    const [result, setResult] = useState<CalculationResult | null>(null);
    const isDark = useDarkMode();

    const updateValue = (rowId: string, variableName: string, value: string) => {
        setRows(prev =>
            prev.map(r =>
                r.id === rowId
                    ? { ...r, values: { ...r.values, [variableName]: sanitizeNumberInput(value) } }
                    : r
            )
        );
    };

    const addRow = () => setRows(prev => [...prev, createRow(variables)]);
    const removeRow = (id: string) => setRows(prev => prev.filter(r => r.id !== id));

    const handleCalculate = () => {
        const evalResult = evaluateRows(rows, variables, formulaCalculation);
        if ('error' in evalResult) {
            setResult({ display: '', value: null, error: evalResult.error });
            return;
        }
        const { display, rounded } = formatSimpleResult(evalResult.results);
        setResult({ display, value: rounded, error: null });
    };

    useInitialCalculation(handleCalculate);

    return (
        <CalculatorWrapper heading={heading} formuLatex={formuLatex} isDark={isDark}>
            <div className="mb-6">
                {!isSum ? (
                    /* Single-row vertical layout */
                    <div className="space-y-3">
                        {variables.map(v => (
                            <LabeledVariableInput
                                key={v.variableName}
                                variable={v}
                                value={rows[0].values[v.variableName]}
                                onChange={(val) => updateValue(rows[0].id, v.variableName, val)}
                                isDark={isDark}
                            />
                        ))}
                    </div>
                ) : (
                    /* Multi-row sum layout */
                    <RowGrid
                        rows={rows}
                        variables={variables}
                        isDark={isDark}
                        onUpdateValue={updateValue}
                        onAddRow={addRow}
                        onRemoveRow={removeRow}
                    />
                )}
            </div>
            <ResultSection result={result} isDark={isDark} onCalculate={handleCalculate} />
        </CalculatorWrapper>
    );
};
