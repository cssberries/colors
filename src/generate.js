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
    'cyanish-blue',
    'blue',
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
var exports = module.exports = {};
function generateShades(color, shadesNumber, counter, colorsNumber, colorsList, addNames) {
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
        if (addNames) {
            colorsList[className] = (color.darken((i - 1) * step / 100).hex());
        } else
        colorsList.push((color.darken((i - 1) * step / 100).hex()));
    }
}
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
    } else return {
        '-----Error': `'Size of a set must be: 3,5,7 or 9'`
    }
    if (type === 'strongness') {
        for (let i = 0; i < setSize; i++) {
            let name = property + strongness[i];
            set[name] = `var(--${element}-${name}, ${exports.getMonoAlpha('black', setSize, .4, 1, i)})`;
        }
    }
    return set;
}
exports.generateColorSet = function (colorsNumber, shadesNumber, addNames) {
    var colorsList = [];
    if (addNames) {
        colorsList = {};
    }
    let firstColor = Color('#ff0000');
    let angle = 360 / colorsNumber;
    for (let i = 1; i < colorsNumber + 1; i++) {
        let color = firstColor.rotate(angle * i);
        generateShades(color, shadesNumber, i, colorsNumber, colorsList, addNames);
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
exports.gradate = function (baseColor, amount, weakest, strongest) {
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
exports.getMonoAlpha = function (baseColor, amount, weakest, strongest, position) {
    let list = exports.gradate(baseColor, amount, weakest, strongest);
    let color = list[position];
    return color;
}
exports.generateManualSet = function (manualset) {
    let set = {};
    for (property in manualset) {
        let colors = exports.generateColorSet(12, 4, true);
        colors[property] = exports.getMonoAlpha('#eee', 5, .4, 1, 1);
        let colorName = manualset[property];
        set[property] = `var(--bg-${property},${colors[colorName]})`;
    }
    console.log(set);
    
    return set;
}
// fs.writeFile("shades.json", JSON.stringify(exports.gradate('green', 5, .5, .9), null, 4), function (err) {
//     console.log("The file was saved!");
// });
// fs.writeFile("shades.json", JSON.stringify(exports.generateColorSet(12, 4, true), null, 4), function (err) {
//     console.log("The file was saved!");
// });