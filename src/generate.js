const fs = require('fs');
const Color = require('color');
const Palettes = require('./palettes');
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
const strongness_9 = Palettes.names.strongness["9_levels"];
const strongness_7 = Palettes.names.strongness["7_levels"];
const strongness_5 = Palettes.names.strongness["5_levels"];
const strongness_3 = Palettes.names.strongness["3_levels"];

// exports.textColors = {
//     'text-color-weakest': 'rgba(0,0,0, 0.4)',
//     'text-color-weak': 'rgba(0,0,0, 0.55)',
//     'text-color-medium': 'rgba(0,0,0, 0.7)',
//     'text-color-strong': 'rgba(0,0,0, 0.85)',
//     'text-color-strongest': 'rgba(0,0,0, 1)'
// }

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
exports.generateSet = function (type, element, property, setSize) {
    let set = {};
    let strongness = [];
    if (setSize === 3) {
        strongness = strongness_3;
    } else if (setSize === 5) {
        strongness = strongness_5;
    } else if (setSize === 7) {
        strongness = strongness_7;
    } else if (setSize === 9) {
        strongness = strongness_9;
    }else return {
        '-----Error': `'Size of a set must be: 3,5,7 or 9'`
    }
    if (type === 'strongness') {
        for (let i = 0; i < setSize; i++) {
            let name = property + strongness[i];
            set[name] = `var(--${element}-${name}, ${exports.getMonochromeColor('black', setSize, .4, 1, i)})`;
        }
    }
    return set;
}
exports.generateColorSet = function (colorsNumber, shadesNumber) {
    var colorsList = {};
    let firstColor = color('#ff0000');
    let angle = 360 / colorsNumber;
    for (let i = 1; i < colorsNumber + 1; i++) {
        let color = firstColor.rotate(angle * i);
        generateShades(color, shadesNumber, i, colorsNumber, colorsList);
    }
    return colorsList;
}
exports.generateMonoColorSet = function (amount, weakest) {
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
exports.generateMonoColorSet2 = function (amount, medium) {
    let colors = {};
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
        className = strongness_7[i + 4];
        colors[className] = (baseColor.darken((i) * step / 100).hex());
    }
    return colors;
}
exports.generateMonochromeList = function (baseColor, amount, weakest, strongest) {
    let list = [];
    let stepsNumber = amount - 2;
    let stepValue = ((strongest - weakest) / (amount - 1));
    list.push(Color(baseColor).alpha(weakest).hsl().string());
    for (let i = 0; i < stepsNumber; i++) {
        list.push(Color(baseColor).alpha(weakest + parseFloat(stepValue.toFixed(2)) * (i + 1)).hsl().string());
    }
    list.push(Color(baseColor).alpha(strongest).hsl().string());
    return list;
}
exports.getMonochromeColor = function (baseColor, amount, weakest, strongest, position) {
    let list = exports.generateMonochromeList(baseColor, amount, weakest, strongest);
    let color = list[position];
    return color;
}
// fs.writeFile("colors-list.json", JSON.stringify(exports.getMonochromeColor('black', 5, .4, 1, 2), null, 4), function (err) {
//     console.log("The file was saved!");
// });