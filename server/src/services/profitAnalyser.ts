'use struct';

export default class ProfitAnalyser {
  currency: Array<Object>;

  constructor(currency){
    this.currency = currency;
  }

  getProfit(): Object{
    let result = {buy: {}, sell: {}, profit: Number.MIN_VALUE}
    let currency = this.currency;
    for(let i = 0; i < currency.length; i++){
      for(let j = i+1; j < currency.length; j++){
        if(result['profit']<currency[j]['price']-currency[i]['price'])
          result ={buy: {
              date: currency[i]['date'], time: currency[i]['time'], price: parseFloat(currency[i]['price'])
            },
            sell: {
              date: currency[j]['date'], time: currency[j]['time'], price: parseFloat(currency[j]['price'])
            },
            profit: parseFloat(currency[j]['price'])- parseFloat(currency[i]['price'])}
      }
    }

    return result;
  }
}

