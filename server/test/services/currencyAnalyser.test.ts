'use struct';
import * as chai from 'chai';
import CurrencyAnalyser from "../../src/services/currencyAnalyser"
import * as path from "path";

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
    let result: Object = currencyAnalyser.annalyseCurrency('20180507', '20180508', ['BTC', 'ETC']);

    expect(result['BTC']).to.deep.equal({
      buy: {date: '20180507', time: '0915', price: 35.5},
      sell: {date: '20180507', time: '1045', price: 38},
      profit: 2.5})
    expect(result['ETC']).to.deep.equal({
      buy: {date: '20180508', time: '0900', price: 1.45},
      sell: {date: '20180508', time: '1245', price: 2.50},
      profit: 1.05})
  });

  it('should return return an empty object if no inputs given', function() {
    let currencyAnalyser: any = new CurrencyAnalyser(currencies);
    let result: Object = currencyAnalyser.annalyseCurrency();
    expect(result).to.deep.equal({})
  });

  it('the best possible buy and sell price that maximises the profit only for ETC', function() {
    let currencyAnalyser: any = new CurrencyAnalyser(currencies);
    let result: Object = currencyAnalyser.annalyseCurrency('20180507', '20180508', ['ETC']);
    expect(result['ETC']).to.deep.equal({
      buy: {date: '20180508', time: '0900', price: 1.45},
      sell: {date: '20180508', time: '1245', price: 2.50},
      profit: 1.05})
  });

  it('should read the data from a given json file and return it', async function() {
    let currencyAnalyser: any = new CurrencyAnalyser();
    let result: any = await currencyAnalyser.reloadData(path.join(__dirname, '../testData/currency.json'));
    expect(result[0]['currency']).to.equal('BTC')
    expect(result[0]['date']).to.equal('20180507')
  })


});
