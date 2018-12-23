const Color = require('color');
var colorsList = {};
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

function generateShades(color, shadesNumber, counter, colorsNumber) {
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
    let firstColor = Color('#ff0000');
    let angle = 360 / colorsNumber;
    for (let i = 1; i < colorsNumber + 1; i++) {
        let color = firstColor.rotate(angle * i);
        generateShades(color, shadesNumber, i, colorsNumber);
    }
    return colorsList;
} 