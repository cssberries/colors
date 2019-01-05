const fs = require('fs');
const Color = require('color');
const colors_3 = [
    'blue',
    'green',
    'red'
];
const colors_6 = [
    'yellow',
    'green',
    'cyan',
    'blue',
    'purple',
    'red'
];
const colors_12 = [
    'orange',
    'yellow',
    'yellowish-green',
    'green',
    'cyanish-green',
    'cyan',
    'blue',
    'cyanish-blue',
    'bluish-purple',
    'purple',
    'redish-purple',
    'red'
];
const shades_4 = [
    '',
    '-dark',
    '-darker',
    '-darkest'
];
const strongness_7 = [
    '-weakest',
    '-weaker',
    '-weak',
    '-medium',
    '-strong',
    '-stronger',
    '-strongest'
];
const strongness_5 = [
    '-weakest',
    '-weak',
    '-medium',
    '-strong',
    '-strongest'
];
const strongness_3 = [
    '-weak',
    '-medium',
    '-strong'
];
exports.textColors = {
    'text-color-weakest': 'rgba(0,0,0, 0.4)',
    'text-color-weak': 'rgba(0,0,0, 0.55)',
    'text-color-medium': 'rgba(0,0,0, 0.7)',
    'text-color-strong': 'rgba(0,0,0, 0.85)',
    'text-color-strongest': 'rgba(0,0,0, 1)'
}
function generateShades(color, shadesNumber, counter, colorsNumber, colorsList) {
    let step = 100 / shadesNumber;
    for (let i = 1; i < shadesNumber + 1; i++) {
        let className = '';
        if (colorsNumber === 3) {
            className = colors_3[counter - 1] + shades_4[i - 1];
        } else
        if (colorsNumber === 6) {
            className = colors_6[counter - 1] + shades_4[i - 1];
        } else
        if (colorsNumber === 12) {
            className = colors_12[counter - 1] + shades_4[i - 1];
        } else {
            className = colorsNumber + '_' + counter + shades_4[i - 1];
        }
        colorsList[className] = (color.darken((i - 1) * step / 100).hex());
    }
}
var exports = module.exports = {};

exports.generateColors = function (colorsNumber, shadesNumber) {
    var colorsList = {};
    let firstColor = Color('#ff0000');
    let angle = 360 / colorsNumber;
    for (let i = 1; i < colorsNumber + 1; i++) {
        let color = firstColor.rotate(angle * i);
        generateShades(color, shadesNumber, i, colorsNumber, colorsList);
    }
    return colorsList;
}
exports.generateMonoColors = function (amount, strongest, medium, weakest) {
    let colors = {};
    let step = 100 / amount;
    let baseColor = Color(weakest).hsl();
    for (let i = 0; i < amount; i++) {
        let className = '';
        if (amount === 3) {

            className = strongness_3[i];
        } else
        if (amount === 5) {
            className = strongness_5[i];
        } else
        if (amount === 7) {
            className = strongness_7[i];
        } else {
            className = amount + '_' + i;
        }
        colors[className] = (baseColor.darken((i) * step / 100).hex());
    }
    return colors;
}
exports.generateMonoColors2 = function (amount, medium) {
    let colors = {};
    let weakColors = {};
    let strongColors = {};
    let baseColor = Color(medium).hsl();
    let gradationNumber = amount / 2 - 1;
    let step = 100 / amount;

    for (let i = 0; i < gradationNumber; i++) {
        let className = '';
        className = strongness_7[i];
        colors[className] = (baseColor.lighten((i) * step / 100).hex());
    }
    colors['-medium'] = medium;
    for (let i = 0; i < gradationNumber; i++) {
        let className = '';
        className = strongness_7[i+4];
        colors[className] = (baseColor.darken((i) * step / 100).hex());
    }
    return colors;
}
fs.writeFile("mono-colors.json", JSON.stringify(exports.generateMonoColors(7, 'red', 'red', 'green'), null, 4), function (err) {
    console.log("The file was saved!");
});
fs.writeFile("mono-colors-by-medium.json", JSON.stringify(exports.generateMonoColors2(7, '#555'), null, 4), function (err) {
    console.log("The file was saved!");
});
fs.writeFile("colors_2.json", JSON.stringify(exports.generateColors(6, 1)), function (err) {
    console.log("The file was saved!");
});