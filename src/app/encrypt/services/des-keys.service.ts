import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DesKeysService {
  private iterations = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1]
  private PC1 = [
    57, 49, 41, 33, 25, 17, 9, 1,
    58, 50, 42, 34, 26, 18, 10, 2,
    59, 51, 43, 35, 27, 19, 11, 3,
    60, 52, 44, 36, 63, 55, 47, 39,
    31, 23, 15, 7, 62, 54, 46, 38,
    30, 22, 14, 6, 61, 53, 45, 37,
    29, 21, 13, 5, 28, 20, 12, 4
  ]
  private PC2 = [
    14, 17, 11, 24, 1, 5,
    3, 28, 15, 6, 21, 10,
    23, 19, 12, 4, 26, 8,
    16, 7, 27, 20, 13, 2,
    41, 52, 31, 37, 47, 55,
    30, 40, 51, 45, 33, 48,
    44, 49, 39, 56, 34, 53,
    46, 42, 50, 36, 29, 32,
  ]

  generateKeys(key: string) {
    const newKey = this.permutations(key, this.PC1);
    const keys0 = this.splitKey(newKey, 28);
    const keys = [keys0]
    for (let i = 1; i < 17; i++) {
      keys[i] = this.left(keys[i - 1], i);
    }
    const joined = keys.map(key => this.joinKeys(key))
    return joined.map(key => this.permutations(key, this.PC2));
  }

  private permutations(value: string, permutatationTable: number[]): string {
    let result = ''
    for (let i = 0; i < permutatationTable.length; i++) {
      result = result + value[permutatationTable[i] - 1];
    }
    return result;
  }

  private splitKey(value: string, length: number): string[] {
    let C0 = value.substr(0, length)
    let D0 = value.substr(length, length)
    return [C0, D0];
  }

  private left(value: string[], iteration: number) {
    return [this.leftShift(value[0], this.iterations[iteration - 1]), this.leftShift(value[1], this.iterations[iteration - 1])];
  }

  private leftShift(value: string, count: number): string {
    return value.substr(count, value.length) + value.substr(0, count)
  }

  private joinKeys(value: string[]): string {
    return value[0] + value[1];
  }
}
