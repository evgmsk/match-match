module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
    },
    "extends": "airbnb",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
        },
        "sourceType": "module",
    },
    "rules": {
        "arrow-parens": "off",
        "array-callback-return": "off",
        "camelcase": "off",
        "class-methods-use-this": "warn",
        "comma-dangle": "warn",
        "curly": "off",
        "indent": "off",
        "function-paren-newline": "warn",
        "key-spacing": "warn",
        "keyword-spacing": "warn",
        "linebreak-style": "off",
        "no-func-assign": "warn",
        "no-param-reassign": "warn",
        "no-plusplus": "off",
        "no-trailing-spaces": "warn",
        "no-unused-vars": "warn",
        "object-curly-newline": "off",
        "object-curly-spacing": "warn",
        "object-shorthand": "warn",
        "require-jsdoc": "warn",
        "space-before-blocks": "warn",
        "spaced-comment": "warn",
        "prefer-destructuring": "warn",
    }
};
