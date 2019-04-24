'use struct';
// Import necessary libraries
import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as configs from "../config";
import profits from "./routes/profits";
import currencies from "./routes/currencies";
import home from "./routes";

const app = express();
const config = configs[app.get('env')];
app.locals.title = config.sitename;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../client/build')));


if (app.get('env') === 'development') {
  app.locals.pretty = true;
}


const port = 5000 // Port on which incoming requests will arrive

app.use('/api/profits', profits); // Connect the base route to the route handling function stored inside /routes/index
app.use('/api/currencies', currencies); // Connect the /health route to the route handling function stored /routes/health
app.use('/*', home); // Connect the /metadata route to the route handling function stored /routes/meta

// Run the web app and store the returned variable for later export
let server = app.listen(port, () => console.log(`Listening on ${port}`));
export default server; // Export the server for unit testing
