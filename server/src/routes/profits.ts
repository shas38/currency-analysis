// This file handles the /metadata route
"use strict";
import * as express from "express";
import * as path from "path";
import CurrencyAnalyser from '../services/currencyAnalyser'
const router = express.Router();


router.post('/', async (req, res) => {
  console.log('profits post')
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  const currencySelected = req.body.currencySelected;
  const currencyAnalyser = new CurrencyAnalyser([], path.join(__dirname, '../../data/currency.json'));
  await currencyAnalyser.reloadData()
  const result = currencyAnalyser.annalyseCurrency(fromDate, toDate, currencySelected);
  console.log(fromDate)
  res.status(200).json(result); // Reply with the result object
})


router.get('/', async (req, res) => {
  console.log('profits get')
  const result = {ETC: {
    buy: {date: '20180508', time: '0900', price: 1.45},
    sell: {date: '20180508', time: '1245', price: 2.50},
    profit: 1.05}};

  res.status(200).json(result); // Reply with the result object
})

export default router;
