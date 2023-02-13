"use strict";
exports.__esModule = true;
var express = require("express");
var routes_1 = require("./routes");
var app = express();
app.use(express.json());
app.use(routes_1.router);
app.listen(process.env.port || 3000, function () {
    console.log('Server running on port 3000');
});
