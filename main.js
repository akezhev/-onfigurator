// Значения из текстовых инпутов
const totalCost = document.getElementById("total-cost"),
  anInitialFee = document.getElementById("an-initial-fee"),
  creditTerm = document.getElementById("credit-term");

// Значения из range  инпутов
const totalCostRange = document.getElementById("total-cost-range"),
  anInitialFeeRange = document.getElementById("an-initial-fee-range"),
  creditTermRange = document.getElementById("credit-term-range");

// Иоговые выводимые значения
const totalAmountOfCredit = document.getElementById("amount-of-credit"),
  totalMonthlyPayment = document.getElementById("monthly-payment"),
  totalRecommededIncome = document.getElementById("recommended-income");

// Все range's
const inputsRange = document.querySelectorAll(".input-range");

// Все кнопки с процентной ставкой
const bankBtns = document.querySelectorAll(".bank");

const assignValue = () => {
  totalCost.value = totalCostRange.value;
  anInitialFee.value = anInitialFeeRange.value;
  creditTerm.value = creditTermRange.value;
};
assignValue();

const banks = [
  {
    name: "alfa",
    precents: 8.7,
  },
  {
    name: "sberbank",
    precents: 8.4,
  },
  {
    name: "pochta",
    precents: 7.9,
  },
  {
    name: "tinkoff",
    precents: 9.2,
  },
];
let currentPrecent = banks[0].precents;

for (let bank of bankBtns) {
  bank.addEventListener("click", () => {
    for (let item of bankBtns) {
      item.classList.remove("active");
    }
    bank.classList.add("active");
    takeActiveBank(bank);
  });
}

const takeActiveBank = (currentActive) => {
  const dataAttrValue = currentActive.dataset.name;
  const currentBank = banks.find((bank) => bank.name === dataAttrValue);
  currentPrecent = currentBank.precents;
  calculation(totalCost.value, anInitialFee.value, creditTerm.value);
};

for (let input of inputsRange) {
  input.addEventListener("input", () => {
    assignValue();
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
  });
}

// Калькулятор
const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
  // ФОРМУЛА РАСЧЕТА
  // ЕП - ежемесячный платеж,
  // РК - размер кредита,
  // ПС - процентная ставка,
  // КМ - количество месяцев

  // ЕП = (РК + (((РК / 100) * ПС) / 12) * КМ) / КМ;

  let monthlyPayment; // ЕП
  let lounAmount = totalCost - anInitialFee; // РК
  let interstRate = currentPrecent; // ПС
  let numberOfYears = creditTerm; // количество лет
  let numberOfMonths = 12 * numberOfYears; // КМ

  monthlyPayment =
    (lounAmount + (((lounAmount / 100) * interstRate) / 12) * numberOfMonths) /
    numberOfMonths;
  const monthlyPaymentArrounded = Math.round(monthlyPayment);
  if (monthlyPaymentArrounded < 0) {
    return false;
  } else {
    totalAmountOfCredit.innerHTML = `${lounAmount} ₽`;
    totalMonthlyPayment.innerHTML = `${monthlyPaymentArrounded} ₽`;
    totalRecommededIncome.innerHTML = `${
      monthlyPaymentArrounded + (monthlyPaymentArrounded / 100) * 35
    } ₽`;
  }
};
