'use struct';

import ProfitAnalyser from "./profitAnalyser";
import CurrencyDataFormatter from "./currencyDataFormatter";


export default class CurrencyAnalyser {
  currencies: Array<Object>;

  constructor(currencies){
    this.currencies = currencies;
  }
  annalyseCurrency(): Object{
    let currencyDataFormatter = new CurrencyDataFormatter(this.currencies);
    let formattedCurrencies = currencyDataFormatter.formatCurrencies();
    const keys = Object.keys(formattedCurrencies)
    let profits = {};
    keys.forEach(key => {
      let profitAnalyser = new ProfitAnalyser(formattedCurrencies[key]);
      profits[key] =  profitAnalyser.getProfit()
    });
    return profits;
  }
}
