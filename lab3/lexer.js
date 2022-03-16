import Token from "./token";
import { TokenType, lookupIdent } from "./token";

export default function Lexer() {
    let _input;
    let _position;
    let _readPosition;
    let _ch;

    function init(input) {
        _input = input;
        _position = 0;
        _readPosition = 0;

        readChar();
    }

    function nextToken() {
        let token;

        skipWhitespace();

        switch (_ch) {
            case "+":
                if (peekChar() === "+") {
                    let ch = _ch;
                    readChar();
                    let literal = ch + _ch;
                    token = newToken(TokenType.INCREMENT, literal);
                } else {
                    token = newToken(TokenType.PLUS, _ch);
                }
                break;
            case "-":
                if (peekChar() === "-") {
                    let ch = _ch;
                    readChar();
                    let literal = ch + _ch;
                    token = newToken(TokenType.DECREMENT, literal);
                } else {
                    token = newToken(TokenType.MINUS, _ch);
                }
                break;
            case "*":
                token = newToken(TokenType.ASTERISK, _ch);
                break;
            case "/":
                if (peekChar() === "/") {
                    token = newToken(TokenType.COMMENT, readComment().trim());
                } else {
                    token = newToken(TokenType.SLASH, _ch);
                }
                break;
            case "<":
                if (peekChar() === "=") {
                    let ch = _ch;
                    readChar();
                    let literal = ch + _ch;
                    token = newToken(TokenType.LOET, literal);
                } else {
                    token = newToken(TokenType.LT, _ch);
                }
                break;
            case ">":
                if (peekChar() === "=") {
                    let ch = _ch;
                    readChar();
                    let literal = ch + _ch;
                    token = newToken(TokenType.GOET, literal);
                } else {
                    token = newToken(TokenType.GT, _ch);
                }
                break;
            case ";":
                token = newToken(TokenType.SEMICOLON, _ch);
                break;
            case ",":
                token = newToken(TokenType.COMMA, _ch);
                break;
            case "{":
                token = newToken(TokenType.LBRACE, _ch);
                break;
            case "}":
                token = newToken(TokenType.RBRACE, _ch);
                break;
            case "(":
                token = newToken(TokenType.LPAREN, _ch);
                break;
            case ")":
                token = newToken(TokenType.RPAREN, _ch);
                break;
            case "=":
                if (peekChar() === "=") {
                    let ch = _ch;
                    readChar();
                    let literal = ch + _ch;
                    token = newToken(TokenType.EQ, literal);
                } else {
                    token = newToken(TokenType.ASSIGN, _ch);
                }
                break;
            case "!":
                if (peekChar() === "=") {
                    let ch = _ch;
                    readChar();
                    let literal = ch + _ch;
                    token = newToken(TokenType.NOT_EQ, literal);
                } else {
                    token = newToken(TokenType.BANG, _ch);
                }
                break;
            case 0:
                token = newToken(TokenType.EOF, "");
                break;
            default:
                if (isLetter(_ch)) {
                    let literal = readIdentifier();

                    if (isDigit(_ch)) {
                        let numberPart = readNumber();
                        token = newToken(TokenType.IDENT, literal + numberPart);
                    } else {
                        token = newToken(lookupIdent(literal), literal);
                    }

                    return token;
                } else if (isDigit(_ch)) {
                    let literal = readNumber();

                    if (isLetter(_ch)) {
                        let invalidPart = readIdentifier();
                        token = newToken(
                            TokenType.ILLEGAL,
                            literal + invalidPart
                        );
                    } else {
                        token = newToken(TokenType.INT, literal);
                    }

                    return token;
                } else {
                    token = newToken(TokenType.ILLEGAL, _ch);
                }
        }

        readChar();

        return token;
    }

    function readChar() {
        if (_readPosition > _input.length - 1) {
            _ch = 0;
        } else {
            _ch = _input[_readPosition];
        }

        _position = _readPosition;
        _readPosition += 1;
    }

    function peekChar() {
        if (_readPosition > _input.length - 1) {
            return 0;
        } else {
            return _input[_readPosition];
        }
    }

    function readIdentifier() {
        let position = _position;

        while (isLetter(_ch)) {
            readChar();
        }

        return _input.substring(position, _position);
    }

    function readComment() {
        let position = _position + 2;

        while (_ch !== "\n") {
            readChar();
        }

        return _input.substring(position, _position);
    }

    function readNumber() {
        let position = _position;

        while (isDigit(_ch)) {
            readChar();
        }

        return _input.substring(position, _position);
    }

    function skipWhitespace() {
        while (_ch === " " || _ch === "\n" || _ch === "\t" || _ch === "\r") {
            readChar();
        }
    }

    function newToken(tokenType, tokenValue) {
        return new Token(tokenType, tokenValue);
    }

    function isDigit(ch) {
        return "0" <= ch && ch <= "9";
    }

    function isLetter(ch) {
        return (
            ("a" <= ch && ch <= "z") || ("A" <= ch && ch <= "Z") || ch === "_"
        );
    }

    return {
        init,
        nextToken,
    };
}
