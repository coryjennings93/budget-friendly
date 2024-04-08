export const dateFormatter = (date: Date) => {
    return date.toLocaleDateString("en-US");
}

export const currencyFormatter = new Intl.NumberFormat("US", {
    currency: "USD",
    style: "currency",
});

export const formatCostBasedOnTransactionType = (transactionType: string, cost: number) => {
    if (transactionType === "Expense") {
        return cost * -1;
    } else {
        return cost;
    }
}