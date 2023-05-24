
export class X01Input {
  Sum: number;
  Darts: number[];
  constructor(sum: number, darts: number[]) {
    this.Sum = sum;
    this.Darts = darts;
  }

  public next(score: number) {
    if (this.Darts.length == 3) {
      this.Darts = this.Darts.slice(1); // Fifo
      this.Darts.push(score); // Add new dart

      //this.lastThreeString = this.lastThreeInputs.join(' ')
      this.Sum = this.Darts.reduce((a, b) => {
        return a + b;
      });
    }
  }
  public reset(): void {
    this.Sum = 0
    this.Darts = [0, 0, 0]
  }
  public get getString(): string {
    return this.Darts.join(' ');
  }
}
