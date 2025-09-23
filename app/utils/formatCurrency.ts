interface iAppProps {
    amount: number;
    currency: "EUR" | "USD" | "GBP" | "INR" | "JPY";
}

export function formatCurrency({ amount, currency }: iAppProps) {
    return new Intl.NumberFormat("fr-BE", {
        style: "currency",
        currency: currency,
    }).format(amount);
}