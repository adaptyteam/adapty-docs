import React, { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { nanoid } from 'nanoid';
import type { ArrCalculatorConfig } from '../content/docs/version-3.0/types';

interface CalculatorProps {
    config: ArrCalculatorConfig;
}

interface RowData {
    id: string;
    price: number | string;
    subs: number | string;
    period: string;
}

export const Calculator: React.FC<CalculatorProps> = ({ config }) => {
    const [rows, setRows] = useState<RowData[]>(() =>
        config.table.defaultRows.map((r) => ({ ...r, id: r.id || nanoid() }))
    );
    const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
    const [expandedFormula, setExpandedFormula] = useState<string | null>(null);
    const [isDark, setIsDark] = useState(false);

    // Refs for rendering Latex
    const headerFormulaRef = useRef<HTMLDivElement>(null);
    const expandedFormulaRef = useRef<HTMLDivElement>(null);

    // Detect dark mode
    useEffect(() => {
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        
        checkDarkMode();
        
        // Listen for theme changes
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (headerFormulaRef.current && config.headerFormulaLatex) {
            katex.render(config.headerFormulaLatex, headerFormulaRef.current, {
                throwOnError: false,
                displayMode: true,
            });
        }
    }, [config.headerFormulaLatex]);

    useEffect(() => {
        if (expandedFormulaRef.current && expandedFormula) {
            katex.render(expandedFormula, expandedFormulaRef.current, {
                throwOnError: false,
                displayMode: true,
            });
        }
    }, [expandedFormula]);

    const handleCalculate = () => {
        let total = 0;
        const formulaParts: string[] = [];

        rows.forEach((row) => {
            const periodData = config.dsyByPeriod[row.period];
            // Default to annual/1 if period not found (should generally not happen with valid config)
            const dsy = periodData ? periodData.dsy : 1;
            const dsyDisplay = periodData ? periodData.display : "1";

            // Convert price to number, handling comma as decimal separator
            const priceNum = typeof row.price === 'string'
                ? parseFloat(row.price.replace(',', '.')) || 0
                : row.price;

            // Convert subs to number
            const subsNum = typeof row.subs === 'string'
                ? parseInt(row.subs) || 0
                : row.subs;

            const rowVal = (priceNum * subsNum) / dsy;
            total += rowVal;

            if (config.showExpandedFormulaOnCalculate) {
                if (periodData.multiplier) {
                    formulaParts.push(`${priceNum} * ${subsNum} * ${periodData.multiplier}`);
                } else {
                    formulaParts.push(`\\frac{${priceNum} \\cdot ${subsNum}}{${dsyDisplay}}`);
                }
            }
        });

        // Round total to 3 decimal places
        total = Math.round(total * 1000) / 1000;
        setCalculatedValue(total);

        if (config.showExpandedFormulaOnCalculate && formulaParts.length > 0) {
            // Construct the full expanded formula: ARR = \sum ... = part1 + part2 + ...
            const summation = formulaParts.join(" + ");

            // Format the total with currency
            const formattedTotal = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: config.output.currency,
                maximumFractionDigits: config.output.precision,
                minimumFractionDigits: config.output.precision,
            }).format(total);

            // Store as plain text instead of LaTeX for clearer rendering
            setExpandedFormula(`${config.output.label} = ${summation} = ${formattedTotal}`);
        } else {
            setExpandedFormula(null);
        }
    };

    const addRow = () => {
        if (rows.length >= config.table.maxRows) return;
        setRows([
            ...rows,
            {
                id: nanoid(),
                price: '' as any,
                subs: '' as any,
                period: config.periodOptions[0].value,
            },
        ]);
    };

    const removeRow = (id: string) => {
        if (rows.length <= config.table.minRows) return;
        setRows(rows.filter((r) => r.id !== id));
    };

    const updateRow = (id: string, field: keyof RowData, value: any) => {
        setRows(
            rows.map((r) => (r.id === id ? { ...r, [field]: value } : r))
        );
    };

    // Sanitize and normalize decimal input
    const sanitizeDecimalInput = (value: string): string => {
        // Replace comma with period
        let sanitized = value.replace(/,/g, '.');

        // Remove all non-digit and non-period characters
        sanitized = sanitized.replace(/[^\d.]/g, '');

        // Ensure only one decimal point
        const parts = sanitized.split('.');
        if (parts.length > 2) {
            sanitized = parts[0] + '.' + parts.slice(1).join('');
        }

        return sanitized;
    };

    // Sanitize integer input - only allow digits
    const sanitizeIntegerInput = (value: string): string => {
        return value.replace(/[^\d]/g, '');
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: config.output.currency,
            maximumFractionDigits: config.output.precision,
            minimumFractionDigits: config.output.precision,
        }).format(val);
    }

    return (
        <div 
            className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-5 md:p-6 max-w-xl mx-auto my-6 border"
            style={{
                backgroundColor: isDark ? 'rgba(39, 39, 42, 0.4)' : '#ffffff',
                borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#f3f4f6',
                boxShadow: isDark ? 'none' : undefined
            }}
        >
            <h2 className="text-lg md:text-xl font-bold mb-4" style={{ color: isDark ? '#f1f5f9' : '#0a0a0a' }}>
                {config.title}
            </h2>

            {/* Header Formula Box */}
            <div 
                className="rounded-lg p-4 mb-6 flex flex-col items-center justify-center border"
                style={{
                    backgroundColor: isDark ? 'rgba(24, 24, 27, 0.5)' : 'rgba(249, 250, 251, 0.5)',
                    borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#f3f4f6'
                }}
            >
                <div 
                    ref={headerFormulaRef} 
                    className="text-base md:text-lg mb-4 calculator-formula"
                    style={{ 
                        color: isDark ? '#f1f5f9' : '#0a0a0a'
                    }}
                />
                <div className="text-xs flex flex-col gap-1 w-full max-w-sm" style={{ color: isDark ? '#cbd5e1' : '#4b5563' }}>
                    {config.legend.map((item, index) => (
                        <div key={index} className="flex gap-2">
                            <span className="font-serif italic font-semibold w-6 text-right shrink-0" style={{ color: isDark ? '#e2e8f0' : '#0a0a0a' }}>
                                {item.symbol}
                            </span>
                            <span style={{ color: isDark ? '#cbd5e1' : '#374151' }}>= {item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6 border-b pb-6" style={{ borderColor: isDark ? '#3f3f46' : '#f3f4f6' }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: isDark ? '#f1f5f9' : '#0a0a0a' }}>
                    {config.table.label}
                </h3>

                {/* Table Header - hidden on mobile, visible on md+ */}
                <div className="hidden md:grid grid-cols-12 gap-3 mb-2 px-1 text-xs font-medium uppercase tracking-wide" style={{ color: isDark ? '#94a3b8' : '#6b7280' }}>
                    <div className="col-span-3">{config.table.columns.priceLabel}</div>
                    <div className="col-span-3">{config.table.columns.subsLabel}</div>
                    <div className="col-span-5">{config.table.columns.periodLabel}</div>
                    <div className="col-span-1"></div>
                </div>

                <div className="space-y-2.5">
                    {rows.map((row) => (
                        <div 
                            key={row.id} 
                            className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-3 items-start md:items-center p-2.5 rounded-lg calculator-row"
                        >

                            {/* Price Input */}
                            <div className="w-full md:col-span-3">
                                <label className="md:hidden text-xs font-medium mb-1 block" style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>
                                    {config.table.columns.priceLabel}
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
                                        $
                                    </span>
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={row.price}
                                        onChange={(e) => updateRow(row.id, 'price', sanitizeDecimalInput(e.target.value))}
                                        onDoubleClick={(e) => e.currentTarget.select()}
                                        className="w-full pl-6 pr-2 py-1.5 text-sm rounded-md shadow-sm border outline-none transition-all focus:ring-1"
                                        style={{
                                            backgroundColor: isDark ? 'rgba(24, 24, 27, 0.7)' : '#ffffff',
                                            borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
                                            color: isDark ? '#f1f5f9' : '#0a0a0a'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Subs Input */}
                            <div className="w-full md:col-span-3">
                                <label className="md:hidden text-xs font-medium mb-1 block" style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>
                                    {config.table.columns.subsLabel}
                                </label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={row.subs}
                                    onChange={(e) => updateRow(row.id, 'subs', sanitizeIntegerInput(e.target.value))}
                                    onDoubleClick={(e) => e.currentTarget.select()}
                                    className="w-full px-2.5 py-1.5 text-sm rounded-md shadow-sm border outline-none transition-all focus:ring-1"
                                    style={{
                                        backgroundColor: isDark ? 'rgba(24, 24, 27, 0.7)' : '#ffffff',
                                        borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
                                        color: isDark ? '#f1f5f9' : '#0a0a0a'
                                    }}
                                />
                            </div>

                            {/* Period Select */}
                            <div className="w-full md:col-span-5 relative">
                                <label className="md:hidden text-xs font-medium mb-1 block" style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>
                                    {config.table.columns.periodLabel}
                                </label>
                                <div className="relative">
                                    <select
                                        value={row.period}
                                        onChange={(e) => updateRow(row.id, 'period', e.target.value)}
                                        className="w-full px-2.5 py-1.5 text-sm rounded-md shadow-sm border outline-none transition-all appearance-none cursor-pointer focus:ring-1"
                                        style={{
                                            backgroundColor: isDark ? 'rgba(24, 24, 27, 0.7)' : '#ffffff',
                                            borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
                                            color: isDark ? '#f1f5f9' : '#0a0a0a'
                                        }}
                                    >
                                        {config.periodOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Remove Button */}
                            <div className="w-full md:col-span-1 flex justify-end md:justify-center mt-1 md:mt-0">
                                <button
                                    onClick={() => removeRow(row.id)}
                                    disabled={rows.length <= config.table.minRows}
                                    className={`p-1.5 rounded-md transition-colors ${rows.length <= config.table.minRows ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                                    style={{
                                        color: isDark ? '#6b7280' : '#9ca3af'
                                    }}
                                    title="Remove row"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c0 1 1 2 2 2v2"></path></svg>
                                    <span className="md:hidden ml-2 text-xs">Remove</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {rows.length < config.table.maxRows && (
                    <div className="mt-3 flex justify-center">
                        <button
                            onClick={addRow}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md font-medium transition-colors border"
                            style={{
                                backgroundColor: isDark ? 'rgba(24, 24, 27, 0.5)' : '#f9fafb',
                                borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
                                color: isDark ? '#d1d5db' : '#4b5563'
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                            Add subscription type
                        </button>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center">
                {calculatedValue !== null && (
                    <div className="mb-4 w-full animate-in fade-in zoom-in-95 duration-200">
                        <div 
                            className="flex items-center justify-between py-3 px-4 rounded-lg shadow-sm border"
                            style={{
                                backgroundColor: isDark ? '#52525b' : '#1a1a1a',
                                borderColor: isDark ? '#71717a' : '#27272a',
                                color: '#f1f5f9'
                            }}
                        >
                            <span className="text-sm font-medium opacity-90">{config.output.label}</span>
                            <span className="text-xl font-bold tracking-tight">{formatCurrency(calculatedValue)}</span>
                        </div>

                        {/* Expanded Formula Result */}
                        {config.showExpandedFormulaOnCalculate && expandedFormula && (
                            <div 
                                className="mt-3 p-3 rounded-lg overflow-x-auto text-sm border font-mono"
                                style={{
                                    backgroundColor: isDark ? 'rgba(24, 24, 27, 0.6)' : '#f9fafb',
                                    borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
                                    color: isDark ? '#e2e8f0' : '#1f2937'
                                }}
                            >
                                <div>{expandedFormula}</div>
                            </div>
                        )}
                    </div>
                )}

                <button
                    onClick={handleCalculate}
                    className="w-full py-2.5 px-4 font-medium text-sm rounded-lg border shadow-sm transition-all active:scale-[0.98]"
                    style={{
                        backgroundColor: isDark ? 'rgba(24, 24, 27, 0.7)' : '#ffffff',
                        borderColor: isDark ? 'rgba(63, 63, 70, 0.5)' : '#e5e7eb',
                        color: isDark ? '#f1f5f9' : '#0a0a0a'
                    }}
                >
                    Calculate
                </button>
            </div>

        </div>
    );
};
