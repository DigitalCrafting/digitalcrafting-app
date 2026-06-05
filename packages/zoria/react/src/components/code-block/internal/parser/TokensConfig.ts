import {TokenizerConfig, TokenTypeEnum} from "./Tokenizer.types";

export const TsxKeywords: string[] = [
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'enum',
    'export',
    'extends',
    'finally',
    'for',
    'function',
    'if',
    'import',
    'in',
    'instanceof',
    'new',
    'return',
    'super',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'await',
    'yield',
    'let',
    'static',
    'as',
    'asserts',
    'any',
    'boolean',
    'constructor',
    'declare',
    'get',
    'infer',
    'is',
    'interface',
    'keyof',
    'module',
    'namespace',
    'never',
    'readonly',
    'set',
    'string',
    'symbol',
    'type',
    'unknown',
    'from',
    'of',
    'private',
    'protected',
    'public',
    'true',
    'false',
    'null',
    'undefined'
]

const TsxKeywordsRules = TsxKeywords.map(word => {
    return [
        new RegExp(`^\\b${word}\\b`),
        TokenTypeEnum.KEYWORD
    ] as [RegExp, TokenTypeEnum];
});

export const TsxTokenConfig: TokenizerConfig = [
    /* ---------------------------------- */
    /* Whitespaces */
    [/^\s+/, TokenTypeEnum.WHITESPACE],

    /* ---------------------------------- */
    /* Comments */
    // Single-line comments
    [/^\/\/.*/, TokenTypeEnum.COMMENT],
    // Multi-line comments
    [/^\/\*[\s\S]*?\*\//, TokenTypeEnum.COMMENT],

    /* ---------------------------------- */
    /* Symbol delimiters */
    [/^;/, TokenTypeEnum.OPERATOR],
    [/^\{/, TokenTypeEnum.BRACES],
    [/^}/, TokenTypeEnum.BRACES],
    [/^\(/, TokenTypeEnum.PARENTHESIS],
    [/^\)/, TokenTypeEnum.PARENTHESIS],
    [/^\[/, TokenTypeEnum.BRACKETS],
    [/^]/, TokenTypeEnum.BRACKETS],
    [/^,/, TokenTypeEnum.OPERATOR],
    [/^\./, TokenTypeEnum.OPERATOR],
    [/^:/, TokenTypeEnum.OPERATOR],
    [/^\?:/, TokenTypeEnum.OPERATOR],
    [/^!:/, TokenTypeEnum.OPERATOR],
    [/^</, TokenTypeEnum.ARROW_LEFT],
    [/^>/, TokenTypeEnum.ARROW_RIGHT],

    /* ---------------------------------- */
    ...TsxKeywordsRules,
    /* ---------------------------------- */
    /* Numbers */
    [/^\d+/, TokenTypeEnum.NUMBER],

    /* ---------------------------------- */
    /* Identifiers: */
    [/^[a-zA-Z_$][a-zA-Z0-9_$]*/, TokenTypeEnum.VARIABLE],

    /* ---------------------------------- */
    /* Equality operators: ==, != */
    [/^[=!]=/, TokenTypeEnum.OPERATOR],

    /* ---------------------------------- */
    /* Assignment operators: =, +=, -=, *=, /= */
    [/^=/, TokenTypeEnum.OPERATOR],
    [/^[+\-*\/]=/, TokenTypeEnum.OPERATOR],

    /* ---------------------------------- */
    /* Math operators: +, -, *, / */
    [/^[+\-]/, TokenTypeEnum.OPERATOR],
    [/^[*\/]/, TokenTypeEnum.OPERATOR],

    /* ---------------------------------- */
    /* Relational operators: >, >=, <, <= */
    [/^[<>]=?/, TokenTypeEnum.OPERATOR],

    /* ---------------------------------- */
    /* Equality operators: ==, != */
    [/^&&/, TokenTypeEnum.OPERATOR],
    [/^\|\|/, TokenTypeEnum.OPERATOR],
    [/^!/, TokenTypeEnum.OPERATOR],

    /* ---------------------------------- */
    /* Strings */
    [/"[^"]*"/, TokenTypeEnum.STRING],
    [/'[^']*'/, TokenTypeEnum.STRING],
];