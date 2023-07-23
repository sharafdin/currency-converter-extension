// Define an interface for the country_list object
interface CountryList {
  [key: string]: string;
}

// Initialize an object that contains the country_list
const country_list: CountryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

// Get all the select elements in the form
const dropList = document.querySelectorAll<HTMLSelectElement>("form select");

// Get the "from" and "to" select elements
const fromCurrency = document.querySelector<HTMLSelectElement>(".from select");
const toCurrency = document.querySelector<HTMLSelectElement>(".to select");

// Loop through each select element and add options for each currency in the country_list
for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    // Select USD by default as the "from" currency and NPR as the "to" currency
    let selected =
      i == 0
        ? currency_code == "TRY"
          ? "selected"
          : ""
        : currency_code == "USD"
        ? "selected"
        : "";
    // Create an option tag with the currency code as the text and value
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    // Insert the option tag inside the select tag
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  // Add an event listener to each select element to load the flag image
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

// A function to load the flag image for the selected currency
function loadFlag(element: HTMLSelectElement) {
  for (let code in country_list) {
    if (code == element.value) {
      // Get the img tag for the selected currency's flag
      let imgTag = element.parentElement.querySelector("img");
      // Set the src attribute of the img tag to the URL of the selected currency's flag
      imgTag.src = `https://flagcdn.com/48x36/${country_list[
        code
      ].toLowerCase()}.png`;
    }
  }
}

// Add an event listener to the window to get the exchange rate when the page loads
window.addEventListener("load", () => {
  getExchangeRate();
});

// Add an event listener to the input field to get the exchange rate when the user enters an amount
document
  .querySelector<HTMLInputElement>("form input")!
  .addEventListener("keyup", () => {
    getExchangeRate();
  });

// Get the exchange icon and add an event listener to swap the "from" and "to" select elements when clicked
const exchangeIcon = document.querySelector<HTMLElement>("form .icon")!;
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

// A function to get the exchange rate and update the exchange rate text
function getExchangeRate() {
  const amount = document.querySelector<HTMLInputElement>("form input")!;
  const exchangeRateTxt = document.querySelector<HTMLElement>(
    "form .exchange-rate"
  )!;
  let amountVal = amount.value;
  // If the user doesn't enter any value or enters 0, set the amount to 1 by default
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = "1";
  }
  // Set the exchange rate text to "Getting exchange rate..." while the exchange rate is being fetched
  exchangeRateTxt.innerText = "Getting exchange rate...";
  // Set the URL for the exchange rate API, using the "from" currency as the base currency
  let url = `https://v6.exchangerate-api.com/v6/b2c0f4ced572c55ce7beea81/latest/${fromCurrency.value}`;
  // Fetch the exchange rate and update the exchange rate text when the response is received
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      // Multiply the user entered amount by the exchange rate to get the total exchange rate
      let totalExRate = (Number(amountVal) * exchangeRate!).toFixed(2);
      // Update the exchange rate text with the total exchange rate
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    })
    .catch(() => {
      // If there is an error while fetching the exchange rate, update the exchange rate text to "Something went wrong"
      exchangeRateTxt.innerText = "Something went wrong";
    });
}
