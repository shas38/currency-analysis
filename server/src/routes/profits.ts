// This file handles the /metadata route
"use strict";
import * as express from "express";

import CurrencyAnalyser from '../services/currencyAnalyser'
const data = require('../../data/currency.json')['data'];
const router = express.Router();



router.get('/', (req, res) => {
  let currencyAnalyser = new CurrencyAnalyser(data);
  const result = currencyAnalyser.annalyseCurrency();

  res.status(200).json(result); // Reply with the result object
})

module.exports = router;
