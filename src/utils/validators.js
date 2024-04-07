import { validateCardNumber } from "./helpers";

export const isExpiryDate = {
  condition: (value) => {
    // Check if the value matches the MM/YY format.
    const regex = /^\d{2}\/\d{2}$/;
    if (!regex.test(value)) return false;

    const [month, expiryYear] = value.split("/").map((num) => parseInt(num, 10));
    const year = 2000 + expiryYear;

    if (month < 1 || month > 12) return false;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) return false;

    // const futureLimitYear = 2000 + 33;
    // if (year > futureLimitYear || (year === futureLimitYear && month > 12)) return false;

    return true;
  },
  message: "validatorsMessage.isExpiryDate",
};

export const isCardNumber = {
  condition: (value) => validateCardNumber(value).isValid,
  message: "validatorsMessage.isCardNumber",
};

export const isCvvExceededLimit = {
  condition: (value) => value.length == 3,
  message: "manageCards.validations.cvv",
};
