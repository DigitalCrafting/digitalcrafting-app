export type TokenizerConfig = [RegExp ,TokenTypeEnum][]

export const TokenTypeEnum = {
    COMMENT: 'comment',
    KEYWORD: 'keyword',
    OPERATOR: 'operator',

    BRACKETS: 'brackets',
    PARENTHESIS: 'parenthesis',
    BRACES: 'braces',
    ARROW_LEFT: 'arrow-left',
    ARROW_RIGHT: 'arrow-right',

    CONSTANT: 'constant',
    FUNCTION: 'function',

    ATTR_NAME: 'attr-name',
    ATTR_VALUE: 'attr-value',

    CLASS_NAME: 'class-name',

    HTML_TAG: 'html-tag',

    VARIABLE: 'variable',
    STRING: 'string',
    CHAR: 'char',
    NUMBER: 'number',
    BOOLEAN: 'boolean',

    WHITESPACE: 'whitespace',
    BREAKLINE: 'breakline',

    ATRULE: 'atrule',
    BUILTIN: 'builtin',
    PROPERTY: 'property',
    REGEX: 'regex',

} as const;
export type TokenTypeEnum = (typeof TokenTypeEnum)[keyof typeof TokenTypeEnum];

export interface Token {
    type: TokenTypeEnum;
    value: string;
}