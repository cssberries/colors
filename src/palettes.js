
const Color = require('color');
const GENERATE = require('./generate');
console.log(GENERATE);
exports.names = {
    'strongness': {
        '3_levels': [
            'weak',
            'medium',
            'strong'
        ],
        '5_levels': [
            'weakest',
            'weak',
            'medium',
            'strong',
            'strongest'
        ],
        '7_levels': [
            'weakest',
            'weaker',
            'weak',
            'medium',
            'strong',
            'stronger',
            'strongest'
        ],
        '9_levels': [
            'weakest',
            'very-weak',
            'weaker',
            'weak',
            'medium',
            'strong',
            'stronger',
            'very-strong',
            'strongest'
        ]
    },
    'brand': [
        'primary',
        'secondary',
        'tertiary',
        'accent'
    ],
    'layout': [
        'canvas',
        'aside',
        'content'
    ],
    'status': [
        'success',
        'info',
        'warning',
        'error',
        'temporal'
    ]
}
exports.basic = {
    // 'primary': `${Generate.generateManualSet('test')})`,
    'secondary': 'var(--color-secondary)',
    'accent': 'var(--color-accent)',
    'canvas': 'var(--color-canvas)',
    'aside': 'var(--color-aside)',
    'content': 'var(--color-content)',
    'success': 'var(--color-success)',
    'warning': 'var(--color-warning)',
    'error': 'var(--color-error)',
    'info': 'var(--color-info)',
    'selected': 'var(--color-selected)',
    'temporary': 'var(--color-info)'
}
exports.values = {
    'primary': 'var(--color-primary)',
    'secondary': 'var(--color-secondary)',
    'accent': 'var(--color-accent)',
    'canvas': 'var(--color-canvas)',
    'aside': 'var(--color-aside)',
    'content': 'var(--color-content)',
    'success': 'var(--color-success)',
    'warning': 'var(--color-warning)',
    'error': 'var(--color-error)',
    'info': 'var(--color-info)',
    'selected': 'var(--color-selected)',
    'temporary': 'var(--color-info)'
}