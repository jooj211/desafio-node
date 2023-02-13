"use strict";
exports.__esModule = true;
var express = require('express');
var Application = require('express').Application;
var cors = require('cors');
var bodyParser = require('body-parser');
var routes_1 = require("./routes");
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes_1.router);
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server is listening on port ".concat(port));
});
