// This file handles the /metadata route
"use strict";
import * as express from "express";
import * as path from "path";
import CurrencyAnalyser from '../services/currencyAnalyser'
const router = express.Router();


router.get('/', async (req, res) => {
  console.log('currency post')
  const currencyAnalyser = new CurrencyAnalyser([], path.join(__dirname, '../../data/currency.json'));
  await currencyAnalyser.reloadData()
  const result = currencyAnalyser.getCurrencies();

  res.status(200).json(result); // Reply with the result object
})

export default router;
