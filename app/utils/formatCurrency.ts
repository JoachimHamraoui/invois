export function formatCurrency(amount: number) {
    return new Intl.NumberFormat("fr-BE", {
        style: "currency",
        currency: "EUR",
    }).format(amount);
}