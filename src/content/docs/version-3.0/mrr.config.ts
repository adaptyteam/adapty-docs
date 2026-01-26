import type { ArrCalculatorConfig } from "./types";

export const MRR_CONFIG: ArrCalculatorConfig = {
    id: "mrr",
    title: "MRR Calculator",

    headerFormulaLatex: String.raw`MRR = \sum_{\text{subscriptions}} \frac{P_s \cdot N_s}{D_{sm}}`,

    legend: [
        { symbol: "Pₛ", text: "subscription price (per billing period)" },
        { symbol: "Nₛ", text: "number of active paid subscriptions for this subscription" },
        { symbol: "Dₛₘ", text: "subscription duration in months (0.23 for weekly, 1 for monthly, 12 for annual)" },
    ],

    periodOptions: [
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
        { value: "2_months", label: "2 Months" },
        { value: "3_months", label: "3 Months" },
        { value: "6_months", label: "6 Months" },
        { value: "annual", label: "Annual" },
    ],

    dsyByPeriod: {
        weekly: { dsy: 0.23, display: "0.23", multiplier: 4.35 },
        monthly: { dsy: 1, display: "1", multiplier: 1 },
        "2_months": { dsy: 2, display: "2", multiplier: 0.5 },
        "3_months": { dsy: 3, display: "3", multiplier: 0.33 },
        "6_months": { dsy: 6, display: "6", multiplier: 0.17 },
        annual: { dsy: 12, display: "12", multiplier: 0.083 },
    },

    table: {
        label: "Subscription types",
        columns: {
            priceLabel: "Price per period",
            subsLabel: "Active subscriptions",
            periodLabel: "Billing period",
        },
        defaultRows: [
            { id: "row-1", price: 240, subs: 2, period: "annual" },
            { id: "row-2", price: 30, subs: 10, period: "monthly" },
            { id: "row-3", price: 10, subs: 20, period: "weekly" },
        ],
        minRows: 1,
        maxRows: 10,
    },

    output: {
        label: "MRR",
        currency: "USD",
        precision: 2,
    },

    showExpandedFormulaOnCalculate: true,
};
