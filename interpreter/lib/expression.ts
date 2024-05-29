import Token from "./token";

type Value = any;

class Expr {}

class Literal extends Expr {
  constructor(public object: Value) {
    super();
  }
}

class Variable extends Expr {
  constructor(public name: Token) {
    super();
  }
}

class Unary extends Expr {
  constructor(public operator: Token, public right: Expr) {
    super();
  }
}

class Binary extends Expr {
  constructor(public left: Expr, public operator: Token, public right: Expr) {
    super();
  }
}

class Logical extends Expr {
  constructor(public left: Expr, public operator: Token, public right: Expr) {
    super();
  }
}

export { Expr, Literal, Variable, Unary, Binary, Logical };
