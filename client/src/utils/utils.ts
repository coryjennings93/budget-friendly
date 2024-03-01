export const dateFormatter = (date: string) => {}

export const currencyFormatter = new Intl.NumberFormat("US", {
    currency: "USD",
    style: "currency",
});