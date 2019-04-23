'use struct';
import * as chai from 'chai';
import CurrencyDataFormatter from "../../src/services/currencyDataFormatter";

const expect = chai.expect;
const currencies: Array<Object> = [
  {
    "currency":"BTC",
    "date": "20180507",
    "quotes":
      [{"time":"0915", "price":"35.5"},
      {"time":"1045", "price":"38"},]
  },
  {
    "currency":"ETC",
    "date": "20180507",
    "quotes":
      [{"time":"0900", "price":"1.45"},
      {"time":"1030", "price":"1.87"}]
  },
];
describe("Test the CurrencyDataFormatter class", function(){
  it('should format the currency array in to a format that can be used in the ProfitAnalyser class', function(){
    let currencyDataFormatter = new CurrencyDataFormatter(currencies);
    let result: Object = currencyDataFormatter.formatCurrencies();
    expect(result['BTC']).to.deep.equal([{date: '20180507', time: '0915', price: '35.5'}, {date: '20180507', time: '1045', price: '38'}]);
    expect(result['ETC']).to.deep.equal([{date: '20180507', time: '0900', price: '1.45'}, {date: '20180507', time: '1030', price: '1.87'}]);
  });
});

