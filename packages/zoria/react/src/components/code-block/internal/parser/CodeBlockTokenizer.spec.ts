import {describe, expect, it} from "vitest";
import {TokenTypeEnum} from "./TokenizerTypes";
import {CodeBlockTokenizer} from "./CodeBlockTokenizer";
import {TsxKeywords, TsxTokenConfig} from "./TokensConfig";

interface TokenTestCase {
    expectedToken: TokenTypeEnum | null,
    query: string,
    expectedValue?: string,
    title?: string,
    calls?: number
}

const TEST_CONFIG: TokenTestCase[] = [
    {
        expectedToken: TokenTypeEnum.WHITESPACE,
        query: ' '
    },
    {
        expectedToken: TokenTypeEnum.COMMENT,
        query: '// this is a comment',
        title: 'should return single-line comment'
    },
    {
        expectedToken: TokenTypeEnum.COMMENT,
        query: '/* this is a comment ' +
            '\n\r' +
            'this is another line */',
        title: 'should return multi-line comment'
    },
    {
        expectedToken: TokenTypeEnum.OPERATOR,
        expectedValue: ';',
        query: ';some other irrelevant stuff'
    },
    {
        expectedToken: TokenTypeEnum.BRACES,
        expectedValue: '{',
        query: '{some other irrelevant stuff'
    },
    {
        expectedToken: TokenTypeEnum.BRACES,
        expectedValue: '}',
        query: '}some other irrelevant stuff'
    },
    {
        expectedToken: TokenTypeEnum.PARENTHESIS,
        expectedValue: '(',
        query: '(some other irrelevant stuff'
    },
    {
        expectedToken: TokenTypeEnum.PARENTHESIS,
        expectedValue: ')',
        query: ')some other irrelevant stuff'
    },
    {
        expectedToken: TokenTypeEnum.BRACKETS,
        expectedValue: '[',
        query: '[some other irrelevant stuff'
    },
    {
        expectedToken: TokenTypeEnum.BRACKETS,
        expectedValue: ']',
        query: ']some other irrelevant stuff'
    },
    {
        expectedToken: TokenTypeEnum.OPERATOR,
        expectedValue: ',',
        query: ',some other irrelevant stuff'
    },
    {
        expectedToken: TokenTypeEnum.OPERATOR,
        expectedValue: '.',
        query: '.some other irrelevant stuff'
    },
    {
        expectedToken: TokenTypeEnum.OPERATOR,
        expectedValue: ':',
        query: ':some other irrelevant stuff'
    },
    {
        expectedToken: TokenTypeEnum.OPERATOR,
        expectedValue: '?:',
        query: '?:some other irrelevant stuff'
    },
    {
        expectedToken: TokenTypeEnum.OPERATOR,
        expectedValue: '!:',
        query: '!:some other irrelevant stuff'
    },
    {
        expectedToken: TokenTypeEnum.ARROW_LEFT,
        expectedValue: '<',
        query: '<some other irrelevant stuff'
    },
    {
        expectedToken: TokenTypeEnum.ARROW_RIGHT,
        expectedValue: '>',
        query: '>some other irrelevant stuff'
    },
    {
        expectedToken: TokenTypeEnum.NUMBER,
        expectedValue: '42',
        query: '42 and something more'
    },
    {
        expectedToken: TokenTypeEnum.VARIABLE,
        expectedValue: '_42more',
        query: '_42more = something'
    },
    /* TODO operators */
]


describe('CodeBlockTokenizer', () => {
    it(`should return null`, () => {
        // given
        const tokenizer = CodeBlockTokenizer.forString('').withConfig(TsxTokenConfig);

        // when
        const actualToken = tokenizer.getNextToken();

        // then
        expect(actualToken).toBe(null);
    });

    TEST_CONFIG.map(({expectedToken, expectedValue, query, title}) => {
        const itTitleSuffix = expectedValue ? ` and value "${expectedValue}"` : '';
        const itTitle = title ?? `should return "${expectedToken}" token${itTitleSuffix}`

        it(itTitle, () => {
            // given
            const tokenizer = CodeBlockTokenizer.forString(query).withConfig(TsxTokenConfig);

            // when
            const actualToken = tokenizer.getNextToken();

            // then
            expect(actualToken?.type).toBe(expectedToken);
            if (expectedValue) {
                expect(actualToken?.value).toBe(expectedValue);
            }
        });
    });

    TsxKeywords.map(keyword => {
        it(`should return "${TokenTypeEnum.KEYWORD}" and value "${keyword}"`, () => {
            // given
            const queryString = `${keyword} some other code`
            const tokenizer = CodeBlockTokenizer.forString(queryString).withConfig(TsxTokenConfig);

            // when
            const actualToken = tokenizer.getNextToken();

            // then
            expect(actualToken?.type).toBe(TokenTypeEnum.KEYWORD);
            expect(actualToken?.value).toBe(keyword);
        })
    })

})