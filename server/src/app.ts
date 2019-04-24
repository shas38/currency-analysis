'use struct';
// Import necessary libraries
import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as createError from 'http-errors';
import * as configs from "../config";
import profits from "./routes/profits";
import currencies from "./routes/currencies";
import home from "./routes";

// Port on which incoming requests will arrive
const port = 5000
// Create the application
const app = express();
// Load the configs
const config = configs[app.get('env')];
// Set sitename
app.locals.title = config.sitename;
// support json encoded bodies
app.use(bodyParser.json());
// support urlencode
app.use(bodyParser.urlencoded({ extended: true }));
// Set the public static folder containing the front end template and logic
app.use(express.static(path.join(__dirname, '../../client/build')));
// If dev env then set pretty to true
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}
// Add the title to the response
app.use(async (req, res, next) => {
  res.locals.status = app.locals.title;
  // Call the next function
  return next();
});


app.use('/', home); // Connect the base route to the route handling function stored inside /routes/index
app.use('/api/profits', profits); // Connect the /api/profits route to the route handling function stored /routes/profits
app.use('/api/currencies', currencies); // Connect the /api/currencies route to the route handling function stored /routes/currencies

// Middleware for handleing error
app.use((req, res, next) => {
  console.log('first')
  return next(createError(404, 'File not found'));
});
// Middleware for handleing error
app.use((err, req, res, next) => {
  console.log('second')
  res.locals.message = err.message;
  const status = err.status || 500;
  res.locals.status = status;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(status);

  // respond with html page
  if (req.accepts('html')) {
    return res.status(404).redirect('back');
  }

  // respond with json
  if (req.accepts('json')) {
    return res.send({ error: 'Not found' });
  }

  // default to plain-text. send()
  return res.type('txt').send('Not found');
});

// Run the web app and store the returned variable for later export
let server = app.listen(port, () => console.log(`Listening on ${port}`));
// Export the server for unit testing
export default server;
