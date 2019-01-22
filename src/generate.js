'use strict';

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
const tints_4 = [
    '',
    '-light',
    '-lighter',
    '-lightest'
];
const strongness_9 = Palettes.names.strongness["9_levels"];
const strongness_7 = Palettes.names.strongness["7_levels"];
const strongness_5 = Palettes.names.strongness["5_levels"];
const strongness_3 = Palettes.names.strongness["3_levels"];

var e = module.exports = {};
Object.prototype.mixture = function (shades, tints) {
    let colors = this.colors;
    let mixture = [];

    for (let colorNumber = 0; colorNumber < colors.length; colorNumber++) {   
        let parsedColor = Color(colors[colorNumber]);
        let mixtureNumber = shades + tints;
        let step = 100 / mixtureNumber;
        for (let i = 2; i < mixtureNumber + 1; i++) {
            if (i < tints) {
                mixture.push((parsedColor.lighten((i - 1) * step / 100).hex()));
            } else mixture.push((parsedColor.darken((i - 1) * step / 100).hex()));
        }    
    }
    this.mixture = mixture;
    return this;
}
e.colors = function (amount) {
    let colors = [];
    let firstColor = Color('#ff0000');
    let angle = 360 / amount;
    for (let i = 1; i < amount + 1; i++) {
        let color = firstColor.rotate(angle * i).hex();
        colors.push(color);
    }
    this.colors = colors;
    return this;
}

fs.writeFile("2.json", JSON.stringify((
    e.colors(6)
    .mixture(4,4)

), null, 4), function (err) {
    console.log("The file was saved!");
    });

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
e.generateSet = function (type, element, property, setSize) {
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
            set[name] = `var(--${element}-${name}, ${e.getMonoAlpha('black', setSize, .4, 1, i)})`;
        }
    }
    return set;
}

e.generateColorSet = function (colorsNumber, shadesNumber, addNames) {
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
e.generateMonoColorSet = function (amount, weakest) {
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
e.gradate_1 = function (g) {
    let list = [];
    let stepValue = ((g.to - g.from) / (g.gradations - 1));
    for (let i = 0; i < g.gradations; i++) {
        let colorValue = Color(g.color)[g.manipulation](((stepValue * i) + g.from).toFixed(3)).rgb().string();
        if (g.addVars) {
            if (g.gradations > 1) {
                list.push(`var(--${g.varName}, ${colorValue})`);
            } else
            list.push(`var(--${g.varName}), ${colorValue}`);
        } else
            list.push(colorValue);
    }
    if (Number.isInteger(g.step)) {
        return list[g.step];
    } else
        return list;
}
e.gradate = function (baseColor, amount, weakest, strongest, manipulation, step) {
    let list = [];
    let stepValue = ((strongest - weakest) / (amount - 1));
    for (let i = 0; i < amount; i++) {
        let colorValue = Color(baseColor)[manipulation](((stepValue * i) + weakest).toFixed(3)).rgb().string();
        list.push(colorValue);
    }
    if (Number.isInteger(step)) {
        return list[step];
    } else
        return list;
}
e.getMonoAlpha = function (baseColor, amount, weakest, strongest, position) {
    let list = e.gradate(baseColor, amount, weakest, strongest, 'alpha');
    let color = list[position];
    return color;
}
e.generateManualSet = function (manualset) {
    let set = {};
    for (property in manualset) {
        let colors = e.generateColorSet(12, 4, true);
        colors[property] = e.getMonoAlpha('white', 5, .4, 1, 1);
        let colorName = manualset[property];
        set[property] = `var(--bg-${property},${colors[colorName]})`;
    }
    return set;
}

// fs.writeFile("gradateObject.json", JSON.stringify(e.gradate_1(
//     {
//         'color': 'white',
//         'gradations': 3,
//         'from': 0,
//         'to': .1,
//         'manipulation': 'darken',
//         'varName': 'bg-canvas',
//         'step': 2,
//         'addVars': true
//     }
// ), null, 4), function (err) {
//     console.log("The file was saved!");
// });
// fs.writeFile("shades.json", JSON.stringify(e.gradate('white', 5, 0, .215, 'darken'), null, 4), function (err) {
//     console.log("The file was saved!");
// });
fs.writeFile("gradate.json", JSON.stringify(e.gradate('white', 5, 0, .4, 'darken', 'step', true), null, 4), function (err) {
    console.log("The file was saved!");
});
// fs.writeFile("manual-set.json", JSON.stringify(e.generateManualSet({
//     'content': `['white', 3, .1, 1, 'alpha', 0]`,
//     'aside': `['white', 3, .1, 1, 'alpha', 1]`,
//     'canvas': `['white', 3, .1, 1, 'alpha', 2]`,
//     'primary': 'blue'
// }), null, 4), function (err) {
//     console.log("The file was saved!");
// });