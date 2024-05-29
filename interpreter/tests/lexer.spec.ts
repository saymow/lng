import Lexer from "../lib/lexer";
import TokenType from "../lib/token-type";

describe("Lexer)", () => {
  it("Shoud append EOF at end", () => {
    const tokens = new Lexer("").scan();

    expect(tokens.length).toBe(1);
    expect(tokens[0].type).toBe(TokenType.EOF);
  });

  it("Shoud handle single caracter tokens properly", () => {
    const tokens = new Lexer("(){},.-+;/*").scan();

    expect(tokens[0].type).toBe(TokenType.LEFT_PAREN);
    expect(tokens[1].type).toBe(TokenType.RIGHT_PAREN);
    expect(tokens[2].type).toBe(TokenType.LEFT_BRACE);
    expect(tokens[3].type).toBe(TokenType.RIGHT_BRACE);
    expect(tokens[4].type).toBe(TokenType.COMMA);
    expect(tokens[5].type).toBe(TokenType.DOT);
    expect(tokens[6].type).toBe(TokenType.MINUS);
    expect(tokens[7].type).toBe(TokenType.PLUS);
    expect(tokens[8].type).toBe(TokenType.SEMICOLON);
    expect(tokens[9].type).toBe(TokenType.SLASH);
    expect(tokens[10].type).toBe(TokenType.STAR);
  });

  it("Shoud handle single caracter tokens properly", () => {
    const tokens = new Lexer("!!====>>=<<=").scan();

    expect(tokens[0].type).toBe(TokenType.BANG);
    expect(tokens[1].type).toBe(TokenType.BANG_EQUAL);
    expect(tokens[2].type).toBe(TokenType.EQUAL_EQUAL);
    expect(tokens[3].type).toBe(TokenType.EQUAL);
    expect(tokens[4].type).toBe(TokenType.GREATER);
    expect(tokens[5].type).toBe(TokenType.GREATER_EQUAL);
    expect(tokens[6].type).toBe(TokenType.LESS);
    expect(tokens[7].type).toBe(TokenType.LESS_EQUAL);
  });

  it("Shoud handle literals properly", () => {
    const tokens = new Lexer('test "str" 77').scan();

    console.log(tokens);

    expect(tokens[0].type).toBe(TokenType.IDENTIFIER);

    expect(tokens[1].type).toBe(TokenType.STRING);
    expect(tokens[1].literal).toBe("str");

    expect(tokens[2].type).toBe(TokenType.NUMBER);
    expect(tokens[2].literal).toBe("77");
  });
});
