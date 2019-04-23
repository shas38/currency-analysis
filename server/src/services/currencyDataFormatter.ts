'use struct';

export default class CurrencyDataFormatter {
  currencies: Array<Object>;

  constructor(currencies){
    this.currencies = currencies;
  }
  formatCurrencies(): Object{
    let result = {};
    this.currencies.forEach(currencyDay => {
      currencyDay['quotes'].forEach(currency => {
        if(currencyDay['currency'] in result)
          result[currencyDay['currency']].push({date: currencyDay['date'], time: currency['time'], price: currency['price']});
        else
          result[currencyDay['currency']] = [{date: currencyDay['date'], time: currency['time'], price: currency['price']}];
      });
    });
    return result;
  }
}
