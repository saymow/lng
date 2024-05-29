import Token from "../lib/token";
import Parser from "../lib/parser";
import TokenType from "../lib/token-type";
import { Literal, Unary } from "../lib/expression";

describe("Parser", () => {
  it("Should handle Literals", () => {
    const ast = new Parser([
      new Token(TokenType.TRUE, "true", true, 1),
      new Token(TokenType.FALSE, "false", false, 1),
      new Token(TokenType.NIL, "nil", null, 1),
      new Token(TokenType.NUMBER, "true", "77", 1),
      new Token(TokenType.STRING, "true", "some-string", 1),
      new Token(TokenType.EOF, "", undefined, 2),
    ]).parse();

    expect(ast).toEqual([
      new Literal(true),
      new Literal(false),
      new Literal(null),
      new Literal("77"),
      new Literal("some-string"),
    ]);
  });

  it("Should handle unaries", () => {
    expect(
      new Parser([
        new Token(TokenType.MINUS, "MINUS", undefined, 1),
        new Token(TokenType.NUMBER, "true", "77", 1),
        new Token(TokenType.EOF, "", undefined, 2),
      ]).parse()
    ).toEqual([
      new Unary(
        new Token(TokenType.MINUS, "MINUS", undefined, 1),
        new Literal("77")
      ),
    ]);

    expect(
        new Parser([
          new Token(TokenType.BANG, "BANG", undefined, 1),
          new Token(TokenType.NUMBER, "true", "77", 1),
          new Token(TokenType.EOF, "", undefined, 2),
        ]).parse()
      ).toEqual([
        new Unary(
          new Token(TokenType.BANG, "BANG", undefined, 1),
          new Literal("77")
        ),
      ]);
  });
});
