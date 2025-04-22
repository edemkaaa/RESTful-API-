module.exports = {
    "env": {
        "node": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-unused-vars": ["warn"],
        "no-console": ["warn", { "allow": ["error"] }],
        "object-curly-spacing": ["error", "always"],
        "comma-dangle": ["error", "never"],
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "no-multiple-empty-lines": ["error", { "max": 1 }],
        "space-before-function-paren": ["error", "never"],
        "space-before-blocks": ["error", "always"]
    }
}