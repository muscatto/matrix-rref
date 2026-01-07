class Fraction {
  constructor(n, d = 1) {
    if (d === 0) throw new Error("ゼロ除算");
    if (d < 0) {
      n = -n;
      d = -d;
    }
    const g = Fraction.gcd(Math.abs(n), d);
    this.n = n / g;
    this.d = d / g;
  }

  static gcd(a, b) {
    while (b !== 0) [a, b] = [b, a % b];
    return a;
  }

  add(f) {
    return new Fraction(this.n * f.d + f.n * this.d, this.d * f.d);
  }

  sub(f) {
    return new Fraction(this.n * f.d - f.n * this.d, this.d * f.d);
  }

  mul(f) {
    return new Fraction(this.n * f.n, this.d * f.d);
  }

  div(f) {
    return new Fraction(this.n * f.d, this.d * f.n);
  }

  isZero() {
    return this.n === 0;
  }

  toString() {
    return this.d === 1 ? `${this.n}` : `${this.n}/${this.d}`;
  }
}

export default Fraction;
