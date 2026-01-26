import type { ArrCalculatorConfig } from "./types";

export const ARR_CONFIG: ArrCalculatorConfig = {
    id: "arr",
    title: "ARR Calculator",

    headerFormulaLatex: String.raw`ARR = \sum_{\text{subscriptions}} \frac{P_s \cdot N_s}{D_{sy}}`,

    legend: [
        { symbol: "Pₛ", text: "subscription price (per billing period)" },
        { symbol: "Nₛ", text: "number of active paid subscriptions for this subscription" },
        { symbol: "Dₛᵧ", text: "subscription duration in years (1/12 for monthly and ~1/52 for weekly)" },
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
        weekly: { dsy: 1 / 52, display: "~1/52", multiplier: 52 },
        monthly: { dsy: 1 / 12, display: "1/12", multiplier: 12 },
        "2_months": { dsy: 2 / 12, display: "2/12", multiplier: 6 },
        "3_months": { dsy: 3 / 12, display: "3/12", multiplier: 4 },
        "6_months": { dsy: 6 / 12, display: "6/12", multiplier: 2 },
        annual: { dsy: 1, display: "1", multiplier: 1 },
    },

    table: {
        label: "Subscription types",
        columns: {
            priceLabel: "Price per period",
            subsLabel: "Active subscriptions",
            periodLabel: "Billing period",
        },
        defaultRows: [
            { id: "row-1", price: 30, subs: 10, period: "monthly" },
            { id: "row-2", price: 10, subs: 20, period: "weekly" },
        ],
        minRows: 1,
        maxRows: 10,
    },

    output: {
        label: "ARR",
        currency: "USD",
        precision: 0,
    },

    showExpandedFormulaOnCalculate: true,
};
