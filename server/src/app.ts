'use struct';

import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as configs from "../config";

// import * as data from '../data/currency.json'



// Import necessary libraries
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const config = configs[app.get('env')];
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}




app.locals.title = config.sitename;


const port = 5000 // Port on which incoming requests will arrive

app.use('/profits', require('./routes/profits')); // Connect the base route to the route handling function stored inside /routes/index
// app.use('/health', require('./routes/health')); // Connect the /health route to the route handling function stored /routes/health
// app.use('/metadata', require('./routes/meta')); // Connect the /metadata route to the route handling function stored /routes/meta

// Run the web app and store the returned variable for later export
let server = app.listen(port, () => console.log(`Listening on ${port}`));
module.exports = server; // Export the server for unit testing
