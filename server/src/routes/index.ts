// This file handles the /metadata route
"use strict";

import * as express from "express";
import * as path from "path";

const router = express.Router();

router.get('/', (req, res) => {
    // console.log(process.env.npm_package_description)
    res.sendFile(path.join(__dirname, '../../client/build'));
})

export default router;
