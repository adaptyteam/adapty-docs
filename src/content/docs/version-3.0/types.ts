export interface ArrCalculatorConfig {
    id: string;
    title: string;
    headerFormulaLatex: string;
    legend: { symbol: string; text: string }[];
    periodOptions: { value: string; label: string }[];
    dsyByPeriod: Record<string, { dsy: number; display: string; multiplier?: number }>;
    table: {
        label: string;
        columns: {
            priceLabel: string;
            subsLabel: string;
            periodLabel: string;
        };
        defaultRows: { id: string; price: number; subs: number; period: string }[];
        minRows: number;
        maxRows: number;
    };
    output: {
        label: string;
        currency: string;
        precision: number;
    };
    showExpandedFormulaOnCalculate: boolean;
}
