'use strict';
const fs = require('fs');

var a = 2;

Number.prototype.multiply = function (n) {
    return this * n;
};

Number.prototype.addName = function (n) {
    return this + n;
};


fs.writeFile("chaining.json", JSON.stringify((

    a.tripple().multiply(7).addName('Belov')

), null, 4), function (err) {
    console.log("The file was saved!");
});