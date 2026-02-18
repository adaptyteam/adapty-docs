import React, { useState } from 'react';
import {
    type Variable,
    type RowData,
    type CalculationResult,
    sanitizeNumberInput,
    useDarkMode,
    renderKatexInline,
    initializeRows,
    createRow,
    evaluateRows,
    formatSimpleResult,
    useInitialCalculation,
    VariableInput,
    RowGrid,
    ResultSection,
    CalculatorWrapper,
    getLabelColor,
    getSubtextColor,
} from './calculatorUtils';

interface SimpleCalculatorProps {
    heading?: string;
    formuLatex: string;
    variables: Variable[];
    formulaCalculation: string;
    isSum?: boolean;
    defaultRowCount?: number;
    defaultRows?: Array<Record<string, number>>;
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
                            <div key={v.variableName} className="flex items-center gap-3">
                                <VariableInput
                                    variable={v}
                                    value={rows[0].values[v.variableName]}
                                    onChange={(val) => updateValue(rows[0].id, v.variableName, val)}
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
