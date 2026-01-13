export const formatNaira = (amount: number, showSymbol = false) => {
  const options: Intl.NumberFormatOptions = showSymbol
    ? {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    : {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };

  return new Intl.NumberFormat("en-NG", options).format(amount);
};
