module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "jest/globals": true
    },
    "extends": [
        "plugin:node/recommended",
        "plugin:jest/recommended",
        "plugin:jest/all"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "jest/require-hook": "off"
    },
    "plugins": ["jest"],
    "settings": {
        "jest": {
          "version": require('jest/package.json').version,
        },
      },
}
