'use struct';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProfitAnalyser {
    constructor(currency) {
        this.currency = currency;
    }
    getProfit() {
        let result = { buy: {}, sell: {}, profit: Number.MIN_VALUE };
        let currency = this.currency;
        for (let i = 0; i < currency.length; i++) {
            for (let j = i + 1; j < currency.length; j++) {
                if (result['profit'] < currency[j]['price'] - currency[i]['price'])
                    result = { buy: {
                            date: currency[i]['date'], time: currency[i]['time'], price: parseInt(currency[i]['price'])
                        },
                        sell: {
                            date: currency[j]['date'], time: currency[j]['time'], price: parseInt(currency[j]['price'])
                        },
                        profit: parseInt(currency[j]['price']) - parseInt(currency[i]['price']) };
            }
        }
        return result;
    }
}
exports.default = ProfitAnalyser;
