import { Binary, Expr, Literal, Unary } from "./expression";
import Token from "./token";
import TokenType from "./token-type";

class Parser {
  private tokens: Token[];
  private current: number;

  /**
   * @param {Token[]} tokens
   */
  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.current = 0;
  }

  parse(): Expr[] {
    const expressions = [];

    while (!this.atEnd()) {
      expressions.push(this.comparisson());
    }

    return expressions;
  }

  private comparisson(): Expr {
    let expr = this.term();

    while (
      this.match(
        TokenType.GREATER,
        TokenType.GREATER_EQUAL,
        TokenType.LESS,
        TokenType.LESS_EQUAL
      )
    ) {
      const operator = this.previous();
      const right = this.term();
      expr = new Binary(expr, operator, right);
    }

    return expr;
  }

  private term(): Expr {
    let expr = this.factor();

    while (this.match(TokenType.MINUS, TokenType.PLUS)) {
      const operator = this.previous();
      const right = this.factor();
      expr = new Binary(expr, operator, right);
    }

    return expr;
  }

  private factor(): Expr {
    let expr = this.unary();

    while (this.match(TokenType.SLASH, TokenType.STAR)) {
      const operator = this.previous();
      const right = this.unary();
      expr = new Binary(expr, operator, right);
    }

    return expr;
  }

  private unary(): Expr {
    if (this.match(TokenType.BANG, TokenType.MINUS)) {
      const operator = this.previous();
      const right = this.unary();
      return new Unary(operator, right);
    }

    return this.primary();
  }

  private primary(): Expr {
    if (this.match(TokenType.TRUE)) {
      return new Literal(true);
    } else if (this.match(TokenType.FALSE)) {
      return new Literal(false);
    } else if (this.match(TokenType.NIL)) {
      return new Literal(null);
    } else if (this.match(TokenType.NUMBER, TokenType.STRING)) {
      return new Literal(this.previous().literal);
    }

    return null as any;
  }

  private advance() {
    if (this.atEnd()) return;
    this.current++;
  }

  private match(...tokenTypes: TokenType[]) {
    if (!tokenTypes.some((tokenType) => this.check(tokenType))) {
      return false;
    }
    this.advance();
    return true;
  }

  private check(tokenType: TokenType) {
    if (this.atEnd()) return false;
    return this.peek().type === tokenType;
  }

  private previous() {
    return this.tokens[this.current - 1];
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private atEnd() {
    return this.peek().type === TokenType.EOF;
  }
}

export default Parser;