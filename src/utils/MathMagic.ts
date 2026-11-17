class ExpressionParser {
  private index = 0;

  constructor(private readonly input: string) {}

  parse(): number {
    if (this.input.length == 0) return 0;
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
        result = this.checked(result + this.parseTerm());
      } else if (this.consume("-")) {
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
        result = this.checked(result * this.parseUnary());
      } else if (this.consume("/")) {
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
      return this.checked(value / 100);
    }

    return value;
  }

  private parsePower(): number {
    const base = this.parsePrimary();
    this.skipWhitespace();

    if (this.consume("^")) {
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
  return new ExpressionParser(expression).parse();
}