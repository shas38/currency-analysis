'use struct';
import * as chai from 'chai';
import CurrencyAnalyser from "../../src/services/currencyAnalyser"

const expect = chai.expect;
const currencies: Array<Object> = [
  {
    "currency":"BTC",
    "date": "20180507",
    "quotes":
      [{"time":"0915", "price":"35.5"},
      {"time":"1045", "price":"38"},
      {"time":"1245", "price":"34"},]
  },
  {
    "currency":"ETC",
    "date": "20180508",
    "quotes":
      [{"time":"0900", "price":"1.45"},
      {"time":"1030", "price":"1.87"},
      {"time":"1245", "price":"2.50"},]
  },
];

describe("Test profitAnalyser class", function(){
  it('should return the best possible buy and sell price that maximises the profit for the given data', function() {
    let currencyAnalyser: any = new CurrencyAnalyser(currencies);
    let result: Object = currencyAnalyser.annalyseCurrency();
    console.log(result)
    expect(result['BTC']).to.deep.equal({
      buy: {date: '20180507', time: '0915', price: 35.5},
      sell: {date: '20180507', time: '1045', price: 38},
      profit: 2.5})
    expect(result['ETC']).to.deep.equal({
      buy: {date: '20180508', time: '0900', price: 1.45},
      sell: {date: '20180508', time: '1245', price: 2.50},
      profit: 1.05})
  });
});
