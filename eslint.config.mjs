import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import _import from "eslint-plugin-import";
import checkFile from "eslint-plugin-check-file";
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptEslint_eslintPlugin from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import sortClassMembers from "eslint-plugin-sort-class-members";
import jsdoc from "eslint-plugin-jsdoc";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "eslint-config-prettier",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "prettier",
)).map(config => ({
    ...config,
    files: ["src/**/*.ts", "src/**/**.*.json"],
})), {
    files: ["src/**/*.ts", "ssrc/**/**.*.json"],

    plugins: {
        import: fixupPluginRules(_import),
        "check-file": checkFile,
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        prettier: fixupPluginRules(prettier),
        "@typescript-eslint": fixupPluginRules(typescriptEslint_eslintPlugin),
        "sort-class-members": sortClassMembers,
        jsdoc,
    },

    languageOptions: {
        globals: {
            ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
            ...globals.node,
            NodeJS: true,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
            parser: "@typescript-eslint/parser"
        },
    },

    settings: {
        "import/resolver": {
            node: {
                extensions: [".ts", ".d.ts"],
            },
        },

        "import/parsers": {
            espree: [".js", ".cjs", ".mjs", ".jsx"],
            "@typescript-eslint/parser": [".ts"],
        },
    },

    rules: {
        "array-callback-return": 2,
        "class-methods-use-this": 0,

        "check-file/folder-match-with-fex": [2, {
            "*.test.{js,ts}": "**/__tests__/**",
        }],

        "check-file/filename-naming-convention": [2, {
            "**/!{migrations}**/!(*.d).{js,ts}": "CAMEL_CASE",
            "**/*.d.{ts}": "CAMEL_CASE",
        }],

        "check-file/folder-naming-convention": [2, {
            "src/**/": "CAMEL_CASE",
        }],

        "consistent-return": 2,
        "default-case": 2,
        "default-case-last": 2,
        "default-param-last": 2,
        "dot-notation": 2,
        eqeqeq: 2,
        "import/extensions": [0, "ignorePackages"],
        "import/default": 0,
        "import/namespace": 0,
        "import/no-named-as-default": 0,
        "import/no-named-as-default-member": 0,
        "import/no-cycle": 2,
        "import/prefer-default-export": 2,
        "import/no-absolute-path": 2,
        "import/no-extraneous-dependencies": 2,
        "import/no-unresolved": 0,

        "import/order": ["error", {
            groups: [["external"], ["index", "sibling", "parent"], "type"],
            "newlines-between": "ignore",

            alphabetize: {
                caseInsensitive: true,
                order: "asc",
            },

            pathGroups: [{
                group: "external",
                pattern: "react",
                position: "before",
            }, {
                group: "external",
                pattern: "@my_org/**",
                position: "after",
            }],

            pathGroupsExcludedImportTypes: ["builtin"],
        }],

        "jsdoc/check-access": 1,
        "jsdoc/check-alignment": 1,
        "jsdoc/check-indentation": 0,
        "jsdoc/check-line-alignment": 1,
        "jsdoc/check-param-names": 1,
        "jsdoc/check-property-names": 1,
        "jsdoc/check-tag-names": [1,
            {
                "definedTags": ["openapi"]
            }
        ],
        "jsdoc/check-types": 1,
        "jsdoc/check-values": 1,
        "jsdoc/empty-tags": 1,
        "jsdoc/implements-on-classes": 1,
        "jsdoc/informative-docs": 1,
        "jsdoc/no-bad-blocks": 1,
        "jsdoc/no-blank-block-descriptions": 1,
        "jsdoc/no-defaults": 1,
        "jsdoc/no-multi-asterisks": 1,
        "jsdoc/require-asterisk-prefix": 1,
        "jsdoc/require-description": 1,
        "jsdoc/require-description-complete-sentence": 1,
        "jsdoc/require-jsdoc": 1,
        "jsdoc/require-param": 1,
        "jsdoc/require-param-description": 1,
        "jsdoc/require-param-name": 1,
        "jsdoc/require-property": 1,
        "jsdoc/require-property-description": 1,
        "jsdoc/require-property-name": 1,
        "jsdoc/require-returns": 1,
        "jsdoc/require-returns-check": 0,
        "jsdoc/require-returns-description": 1,
        "jsdoc/require-throws": 1,
        "jsdoc/sort-tags": 1,
        "jsdoc/tag-lines": 1,
        "jsdoc/valid-types": 1,
        "max-classes-per-file": 2,
        "no-await-in-loop": 2,
        "no-bitwise": 2,
        "no-class-assign": 2,
        "no-cond-assign": 2,
        "no-else-return": 2,
        "no-empty": 2,
        "no-empty-function": 2,
        "no-eq-null": 2,
        "no-eval": 2,
        "no-confusing-arrow": 2,
        "no-constant-binary-expression": 0,
        "no-constant-condition": 2,

        "no-console": [2, {
            allow: ["info", "trace"],
        }],

        "no-constructor-return": 0,
        "no-empty-pattern": 2,
        "no-func-assign": 2,
        "no-implicit-coercion": 0,
        "no-implicit-globals": 2,
        "no-implied-eval": 2,
        "no-import-assign": 2,
        "no-lone-blocks": 2,
        "no-invalid-this": 2,
        "no-magic-numbers": 0,
        "no-multi-str": 2,
        "no-new-func": 2,
        "no-new-wrappers": 2,
        "no-non-null-assertion": 0,
        "no-param-reassign": 2,
        "no-plusplus": 0,
        "no-restricted-modules": 2,
        "no-return-await": 2,
        "no-setter-return": 2,
        "no-shadow": 0,
        "no-this-before-super": 2,
        "no-throw-literal": 2,
        "no-trailing-spaces": 2,
        "no-underscore-dangle": 0,
        "no-unexpected-multiline": 2,
        "no-unreachable": 2,
        "no-unsafe-negation": 2,
        "no-use-before-define": 2,
        "no-octal": 2,
        "no-redeclare": 2,
        "no-regex-spaces": 2,
        "no-return-assign": 2,
        "no-script-url": 2,
        "no-self-compare": 2,
        "no-sequences": 2,
        "no-shadow-restricted-names": 2,
        "no-unused-expressions": 0,
        "no-unused-labels": 2,
        "no-useless-call": 2,
        "no-useless-concat": 2,
        "no-useless-constructor": 2,
        "no-useless-escape": 2,
        "no-useless-rename": 2,
        "no-useless-return": 2,
        "no-void": 2,
        "no-var": 2,

        "object-curly-newline": [2, {
            consistent: true,
        }],

        "object-shorthand": 2,
        "prefer-const": 2,
        "prefer-arrow-callback": 2,

        "prefer-destructuring": [2, {
            object: true,
            array: false,
        }],

        "prefer-exponentiation-operator": 2,
        "prefer-numeric-literals": 2,
        "prefer-object-spread": 2,
        "prefer-promise-reject-errors": 2,
        "prefer-regex-literals": 2,
        "prefer-rest-params": 2,
        "prefer-spread": 2,
        "prefer-template": 2,
        "prettier/prettier": 2,
        "require-atomic-updates": 0,
        "require-unicode-regexp": 2,
        "require-yield": 2,
        "sort-class-members/sort-class-members": [
            2,
            {
                "order": [
                    "[protected-static-property]",
                    "[private-static-property]",
                    "[public-static-property]",

                    "[conventional-private-properties]",
                    "[private-property]",
                    "[protected-property]",
                    "[public-property]",
                    "[properties]",

                    "constructor",

                    "[accessor-pairs]",
                    "[getters]",
                    "[setters]",

                    {
                        type: "method",
                        name: "/^get.+$/",
                        sort: "alphabetical",
                    },
                    {
                        type: "method",
                        name: "/^set.+$/",
                        sort: "alphabetical",
                    },

                    "[static-properties]",
                    "[static-methods]",

                    "[methods]",
                    "[protected-method]",
                    "[conventional-private-methods]",
                    {
                        type: "method",
                        private: true,
                        sort: "alphabetical",
                    },
                    "[private-methods]"
                ],
                "accessorPairPositioning": "getThenSet",

                accessorPairPositioning: "getThenSet",
                stopAfterFirstProblem: false
            },
        ],

        "spaced-comment": 2,
        strict: 2,
        semi: 2,
        "use-isnan": 2,
        "valid-typeof": 2,

        quotes: [2, "single", {
            avoidEscape: true,
        }],

        "@typescript-eslint/consistent-type-assertions": [2, {
            assertionStyle: "as",
        }],

        "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

        "@typescript-eslint/consistent-type-imports": [2, {
            prefer: "type-imports",
            disallowTypeAnnotations: false,
        }],

        "@typescript-eslint/explicit-function-return-type": 2,
        "@typescript-eslint/explicit-module-boundary-types": 2,

        "@typescript-eslint/naming-convention": [2, {
            selector: "interface",
            format: ["PascalCase"],

            custom: {
                regex: "^I[A-Z]",
                match: true,
            },
        }, {
                selector: "enum",
                format: ["PascalCase"],

                custom: {
                    regex: "^E[A-Z]",
                    match: true,
                },
            }, {
                selector: "variable",
                format: ["camelCase", "PascalCase"],
            }, {
                selector: "variable",
                modifiers: ["destructured"],
                format: null,
            }, {
                selector: "classProperty",
                modifiers: ["private"],
                format: ["camelCase"],
                leadingUnderscore: "require",
            }, {
                selector: "typeLike",
                format: ["PascalCase"],
            }, {
                selector: "variable",
                format: ["camelCase"],
            }],

        "@typescript-eslint/no-dynamic-delete": 0,
        "@typescript-eslint/no-empty-interface": 2,
        "@typescript-eslint/no-empty-function": 0,
        "@typescript-eslint/no-explicit-any": 2,
        "@typescript-eslint/no-extraneous-class": 0,
        "@typescript-eslint/no-non-null-assertion": 0,
        "@typescript-eslint/no-shadow": 2,
        "@typescript-eslint/no-unnecessary-condition": 0,
        "@typescript-eslint/no-unsafe-member-access": 2,
        "@typescript-eslint/no-unused-expressions": 0,

        "@typescript-eslint/no-unused-vars": [2, {
            argsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
        }],

        "@typescript-eslint/no-misused-promises": [2, {
            checksVoidReturn: false,
        }],

        "@typescript-eslint/no-this-alias": [2, {
            allowedNames: ["self"],
        }],

        "@typescript-eslint/no-var-requires": 2,
        "@typescript-eslint/prefer-nullish-coalescing": 2,
        "@typescript-eslint/typedef": 2,

        "@typescript-eslint/unbound-method": [2, {
            ignoreStatic: true,
        }],
    },
}];
