'use struct';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profitAnalyser_1 = require("./profitAnalyser");
class CurrencyAnalyser {
    constructor(currencies) {
        this.currencies = currencies;
    }
    formatCurrencies() {
        let result = {};
        this.currencies.forEach(currencyDay => {
            currencyDay['quotes'].forEach(currency => {
                if (currencyDay['currency'] in result)
                    result[currencyDay['currency']].push({ date: currencyDay['date'], time: currency['time'], price: currency['price'] });
                else
                    result[currencyDay['currency']] = [{ date: currencyDay['date'], time: currency['time'], price: currency['price'] }];
            });
        });
        return result;
    }
    annalyseCurrency() {
        let formattedCurrencies = this.formatCurrencies();
        const keys = Object.keys(formattedCurrencies);
        let profits = {};
        keys.forEach(key => {
            let profitAnalyser = new profitAnalyser_1.default(formattedCurrencies[key]);
            profits[key] = profitAnalyser.getProfit();
        });
        return profits;
    }
}
exports.default = CurrencyAnalyser;
