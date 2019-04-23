'use struct';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const configs = require("../config");
const currencyAnalyser_1 = require("./services/currencyAnalyser");
// import * as data from '../data/currency.json'
const data = require('../data/currency.json')['data'];
// Import necessary libraries
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const config = configs[app.get('env')];
if (app.get('env') === 'development') {
    app.locals.pretty = true;
}
let currencyAnalyser = new currencyAnalyser_1.default(data);
console.log(currencyAnalyser.annalyseCurrency());
app.locals.title = config.sitename;
const port = 3000; // Port on which incoming requests will arrive
app.use('/', require('./routes/index')); // Connect the base route to the route handling function stored inside /routes/index
// app.use('/health', require('./routes/health')); // Connect the /health route to the route handling function stored /routes/health
// app.use('/metadata', require('./routes/meta')); // Connect the /metadata route to the route handling function stored /routes/meta
// Run the web app and store the returned variable for later export
let server = app.listen(port, () => console.log(`Listening on ${port}`));
module.exports = server; // Export the server for unit testing
