import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SdesKeysService {
  IP = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6]
  permutationsArray = [6, 3, 7, 4, 8, 5, 10, 9]

  generate(key: string) {
    const newKey = this.permutations(key, this.IP);
    const split = this.splitKey(newKey, 5)
    const a = this.leftShift(split[0], 1);
    const b = this.leftShift(split[1], 1);
    const joined = this.joinKeys([a, b]);
    const key1 = this.permutations(joined, this.permutationsArray)
    const c = this.leftShift(a, 2);
    const d = this.leftShift(b, 2);
    const join = this.joinKeys([c, d])
    const key2 = this.permutations(join, this.permutationsArray)
    return [key1, key2];
  }

  private permutations(value: string, permutatationTable: number[]): string {
    let result = ''
    for (let i = 0; i < permutatationTable.length; i++) {
      result = result + value[permutatationTable[i] - 1];
    }
    return result;
  }

  private joinKeys(value: string[]): string {
    return value[0] + value[1];
  }

  private splitKey(value: string, length: number): string[] {
    let C0 = value.substr(0, length)
    let D0 = value.substr(length, length)
    return [C0, D0];
  }

  private leftShift(value: string, count: number): string {
    return value.substr(count, value.length) + value.substr(0, count)
  }
}
