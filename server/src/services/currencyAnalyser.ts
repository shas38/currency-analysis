'use struct';
import * as util from 'util';
import * as fs from 'fs';
import * as path from "path";
import ProfitAnalyser from "./profitAnalyser";
import CurrencyDataFormatter from "./currencyDataFormatter";

const readFile = util.promisify(fs.readFile);
const defaultPath = path.join(__dirname, '../../data/currency.json')
export default class CurrencyAnalyser {
  currencies: Array<Object>;
  path: string

  constructor(currencies = [], path = defaultPath){
    this.currencies = currencies;
    this.path = path;
  }

  async reloadData(path: string = this.path){
    const data = await readFile(path, 'utf8');
    if (!data) return [];
    this.currencies = JSON.parse(data).data;
    return this.currencies;
  }

  annalyseCurrency(fromDate: string = '20180507', toDate: string = '20180508', currencyList: Array<string> = []): Object{
    const filteredCurrencies = this.currencies.filter((data) =>{
      return parseInt(data['date'])>=parseInt(fromDate)&&parseInt(data['date'])<=parseInt(toDate)&&currencyList.includes(data['currency'])
    })
    const currencyDataFormatter = new CurrencyDataFormatter(filteredCurrencies);
    const formattedCurrencies = currencyDataFormatter.formatCurrencies();
    const keys = Object.keys(formattedCurrencies)
    let profits = {};
    keys.forEach(key => {
      let profitAnalyser = new ProfitAnalyser(formattedCurrencies[key]);
      profits[key] =  profitAnalyser.getProfit()
    });
    return profits;
  }

  getCurrencies(): Array<string>{
    const currencyNames = this.currencies.map(data => data['currency'])
    return currencyNames;
  }
}



