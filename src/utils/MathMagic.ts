class ExpressionParser {
  private index = 0;

  constructor(private readonly input: string) {}

  parse(): number {
    if (this.input.length == 0) return 0;
    this.skipOperatorSequence();
    if (this.index === this.input.length) return 0;

    const result = this.parseExpression();
    this.skipWhitespace();

    if (this.index !== this.input.length) {
      throw new SyntaxError(`Unexpected character at position ${this.index}`);
    }

    return result;
  }

  private parseExpression(): number {
    let result = this.parseTerm();

    while (true) {
      this.skipWhitespace();

      if (this.consume("+")) {
        this.skipOperatorSequence();
        if (!this.hasOperand()) {
          this.ignoreTrailingOperators();
          return result;
        }
        result = this.checked(result + this.parseTerm());
      } else if (this.consume("-")) {
        this.skipOperatorSequence();
        if (!this.hasOperand()) {
          this.ignoreTrailingOperators();
          return result;
        }
        result = this.checked(result - this.parseTerm());
      } else {
        return result;
      }
    }
  }

  private parseTerm(): number {
    let result = this.parseUnary();

    while (true) {
      this.skipWhitespace();

      if (this.consume("*")) {
        this.skipOperatorSequence();
        if (!this.hasOperand()) {
          this.ignoreTrailingOperators();
          return result;
        }
        result = this.checked(result * this.parseUnary());
      } else if (this.consume("/")) {
        this.skipOperatorSequence();
        if (!this.hasOperand()) {
          this.ignoreTrailingOperators();
          return result;
        }
        result = this.checked(result / this.parseUnary());
      } else {
        return result;
      }
    }
  }

  private parseUnary(): number {
    this.skipWhitespace();

    if (this.consume("+")) {
      return this.parseUnary();
    }
    if (this.consume("-")) {
      return this.checked(-this.parseUnary());
    }

    const value = this.parsePower();
    this.skipWhitespace();

    if (this.consume("%")) {
      this.skipWhitespace();
      while (this.consume("%")) this.skipWhitespace();
      return this.checked(value / 100);
    }

    return value;
  }

  private parsePower(): number {
    const base = this.parsePrimary();
    this.skipWhitespace();

    if (this.consume("^")) {
      this.skipOperatorSequence();
      if (!this.hasOperand()) {
        this.ignoreTrailingOperators();
        return base;
      }
      return this.checked(base ** this.parseUnary());
    }

    return base;
  }

  private parsePrimary(): number {
    this.skipWhitespace();

    if (this.consume("(")) {
      const result = this.parseExpression();
      this.skipWhitespace();

      if (!this.consume(")")) {
        throw new SyntaxError(`Expected ")" at position ${this.index}`);
      }

      return result;
    }

    const number = this.input
      .slice(this.index)
      .match(/^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/);

    if (!number) {
      throw new SyntaxError(`Expected a number at position ${this.index}`);
    }

    this.index += number[0].length;
    return this.checked(Number(number[0]));
  }

  private consume(character: string): boolean {
    if (this.input[this.index] !== character) {
      return false;
    }

    this.index += 1;
    return true;
  }

  private skipOperatorSequence(): void {
    this.skipWhitespace();
    let trailingMinus = -1;

    while (this.isOperator(this.input[this.index])) {
      if (this.input[this.index] === "-") {
        trailingMinus = this.index;
      } else {
        trailingMinus = -1;
      }
      this.index += 1;
      this.skipWhitespace();
    }

    if (trailingMinus >= 0 && this.hasOperand()) {
      this.index = trailingMinus;
    }
  }

  private hasOperand(): boolean {
    this.skipWhitespace();
    const character = this.input[this.index];
    if (character === "-") {
      let nextIndex = this.index + 1;
      while (/\s/.test(this.input[nextIndex] ?? "")) nextIndex += 1;
      return this.input[nextIndex] === "(" || /[\d.]/.test(this.input[nextIndex] ?? "");
    }

    return character === "(" || /[\d.]/.test(character ?? "");
  }

  private ignoreTrailingOperators(): void {
    while (this.isOperator(this.input[this.index])) {
      this.index += 1;
      this.skipWhitespace();
    }
  }

  private isOperator(character: string | undefined): boolean {
    return character !== undefined && "+-*/^%".includes(character);
  }

  private skipWhitespace(): void {
    while (/\s/.test(this.input[this.index] ?? "")) {
      this.index += 1;
    }
  }

  private checked(value: number): number {
    if (!Number.isFinite(value)) {
      throw new RangeError("Expression result must be a finite number");
    }

    return value;
  }
}

export function evaluateExpression(expression: string): number {
  const openingParentheses: number[] = [];

  for (let index = 0; index < expression.length; index += 1) {
    if (expression[index] === "(") {
      openingParentheses.push(index);
    } else if (expression[index] === ")") {
      if (openingParentheses.length === 0) {
        return new ExpressionParser(expression.slice(0, index)).parse();
      }
      openingParentheses.pop();
    }
  }

  const firstUnmatchedOpening = openingParentheses[0];
  const validPrefix =
    firstUnmatchedOpening === undefined ? expression : expression.slice(0, firstUnmatchedOpening);
  return new ExpressionParser(validPrefix).parse();
}