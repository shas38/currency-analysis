// This file handles the /metadata route
"use strict";

const meta = require('express').Router();


meta.get('/', (req, res) => {
    // console.log(process.env.npm_package_description)
    let result = {
    }
    res.status(200).json(result); // Reply with the result object
})

module.exports = meta;
