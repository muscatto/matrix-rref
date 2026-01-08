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

  // 約分(ユーグリッドの互除法)
  static gcd(a, b) {
    // 余りが0になるまで商で割り続ける
    while (b !== 0) [a, b] = [b, a % b];
    return a;
  }

  // 足し算
  add(f) {
    return new Fraction(this.n * f.d + f.n * this.d, this.d * f.d);
  }

  // 引き算
  sub(f) {
    return new Fraction(this.n * f.d - f.n * this.d, this.d * f.d);
  }

  // 掛け算
  mul(f) {
    return new Fraction(this.n * f.n, this.d * f.d);
  }

  // 割り算
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
