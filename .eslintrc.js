module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', '@typescript-eslint'],
    extends: [],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/naming-convention': [
            "error",
            {
                "selector": "interface",
                "format": ["PascalCase"],
                "custom": {
                    "regex": "^I[A-Z]",
                    "match": true
                }
            }
        ],
        "eqeqeq": ["error", "always", { "null": "ignore" }],
        "accessor-pairs": ["error"],
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-member-accessibility': 'error',
        "accessor-pairs": ["error", { setWithoutGet: true, getWithoutSet: true, enforceForClassMembers: true }],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'memberLike',
                modifiers: ['private'],
                format: ['camelCase', 'UPPER_CASE'],
                leadingUnderscore: 'require',

            },
        ]
    }
};