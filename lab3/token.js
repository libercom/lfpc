export default function Token(tokenType, tokenValue) {
    return {
        type: tokenType,
        value: tokenValue,
    };
}

export const TokenType = {
    ILLEGAL: "ILLEGAL",
    COMMENT: "COMMENT",
    EOF: "EOF",
    IDENT: "IDENT",
    INT: "INT",
    ASSIGN: "ASSIGN",
    PLUS: "PLUS",
    INCREMENT: "INCREMENT",
    MINUS: "MINUS",
    DECREMENT: "DECREMENT",
    BANG: "BANG",
    ASTERISK: "ASTERISK",
    SLASH: "SLASH",
    LT: "LT",
    LOET: "LOET",
    GT: "GT",
    GOET: "GOET",
    EQ: "EQ",
    NOT_EQ: "NOT_EQ",
    COMMA: "COMMA",
    SEMICOLON: "SEMICOLON",
    LPAREN: "LPAREN",
    RPAREN: "RPAREN",
    LBRACE: "LBRACE",
    RBRACE: "RBRACE",
    FUNCTION: "FUNCTION",
    GENERATOR: "GENERATOR",
    LET: "LET",
    TRUE: "TRUE",
    FALSE: "FALSE",
    IF: "IF",
    ELSE: "ELSE",
    FOR: "FOR",
    RETURN: "RETURN",
    ASYNC: "ASYNC",
    AWAIT: "AWAIT",
    YIELD: "YIELD",
};

export const keywords = {
    fn: TokenType.FUNCTION,
    gn: TokenType.GENERATOR,
    let: TokenType.LET,
    true: TokenType.TRUE,
    false: TokenType.FALSE,
    if: TokenType.IF,
    else: TokenType.ELSE,
    return: TokenType.RETURN,
    async: TokenType.ASYNC,
    await: TokenType.AWAIT,
    yield: TokenType.YIELD,
    for: TokenType.FOR,
};

export function lookupIdent(ident) {
    if (keywords.hasOwnProperty(ident)) {
        return keywords[ident];
    }

    return TokenType.IDENT;
}
