import {Injectable} from '@angular/core';
import {DesKeysService} from "./des-keys.service";

@Injectable({
  providedIn: 'root'
})
export class EncryptDesService {
  private finalPermutation = [
    16, 7, 20, 21,
    29, 12, 28, 17,
    1, 15, 23, 26,
    5, 18, 31, 10,
    2, 8, 24, 14,
    32, 27, 3, 9,
    19, 13, 30, 6,
    22, 11, 4, 25,
  ]
  private IP1 = [
    58, 50, 42, 34, 26, 18, 10, 2,
    60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6,
    64, 56, 48, 40, 32, 24, 16, 8,
    57, 49, 41, 33, 25, 17, 9, 1,
    59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5,
    63, 55, 47, 39, 31, 23, 15, 7,
  ]
  private selection = [
    32, 1, 2, 3, 4, 5,
    4, 5, 6, 7, 8, 9,
    8, 9, 10, 11, 12, 13,
    12, 13, 14, 15, 16, 17,
    16, 17, 18, 19, 20, 21,
    20, 21, 22, 23, 24, 25,
    24, 25, 26, 27, 28, 29,
    28, 29, 30, 31, 32, 1,
  ]
  private S1 = [
    14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
    0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
    4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
    15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13,
  ]
  private S2 = [
    15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
    3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
    0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
    13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9,
  ]
  private S3 = [
    10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
    13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
    13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
    1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12,
  ]
  private S4 = [
    7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
    13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
    10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
    3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14,
  ]
  private S5 = [
    2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
    14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
    4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
    11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3,
  ]
  private S6 = [
    12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
    10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
    9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
    4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13,
  ]
  private S7 = [
    4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
    13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
    1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
    6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12,
  ]
  private S8 = [
    13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
    1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
    7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
    2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11,
  ]
  private sArrays = [
    this.S1,
    this.S2,
    this.S3,
    this.S4,
    this.S5,
    this.S6,
    this.S7,
    this.S8
  ]
  private lastPermutation = [
    40, 8, 48, 16, 56, 24, 64, 32,
    39, 7, 47, 15, 55, 23, 63, 31,
    38, 6, 46, 14, 54, 22, 62, 30,
    37, 5, 45, 13, 53, 21, 61, 29,
    36, 4, 44, 12, 52, 20, 60, 28,
    35, 3, 43, 11, 51, 19, 59, 27,
    34, 2, 42, 10, 50, 18, 58, 26,
    33, 1, 41, 9, 49, 17, 57, 25,
  ]

  constructor(private desKeysService: DesKeysService) {
  }

  encode(value, key) {
    const res = this.encrypt(this.strToBin(value), this.desKeysService.generateKeys(this.strToBin(key)))
    return value.length === 8 ? this.binToStr(res) : value;
  }

  decode(value, key) {
    const res = this.encrypt(this.strToBin(value), this.reverse(this.desKeysService.generateKeys(this.strToBin(key))))
    return value.length === 8 ? this.binToStr(res) : value;
  }

  private strToBin(str: string) {
    let newSecret = '';
    [...str].forEach(a => {
      const bin = a.charCodeAt(0).toString(2);
      const val = "00000000".substr(bin.length) + bin;
      newSecret = newSecret + val;
    })
    return newSecret;
  }

  private binToStr(str: string) {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      const sub = str.substr(i * 8, 8);
      arr.push(String.fromCharCode(parseInt(sub, 2)));
    }
    return arr.join('');
  }

  private reverse(arr: any[]) {
    const a = arr.slice(1, 17);
    return [].concat(a[0], a.reverse());
  }

  private encrypt(value: string, keys: any[]) {
    const ip1 = this.permutations(value, this.IP1)
    const split = this.splitKey(ip1, 32);
    const results = [split]
    for (let i = 1; i < 17; i++) {
      const oldLeft = results[i - 1][0];
      const oldRight = results[i - 1][1];
      const newFunc = this.func(oldRight, keys[i])
      const newLeft = oldRight;
      const newRight = this.add(oldLeft, newFunc);
      results[i] = [newLeft, newRight]
    }
    return this.permutations(results[16][1] + results[16][0], this.lastPermutation);
  }

  private add(a: string, b: string) {
    let xor = ''
    for (let i = 0; i < a.length; i++) {
      xor = xor + (a[i] !== b[i] ? 1 : 0)
    }
    return xor;
  }

  private func(value: string, key: string) {
    const expanded = this.expand(value)
    let xor = ''
    for (let i = 0; i < expanded.length; i++) {
      xor = xor + (expanded[i] !== key[i] ? 1 : 0)
    }
    const splitB = []
    for (let i = 0; i < 8; i++) {
      splitB[i] = xor.substr(i * 6, 6)
    }
    let joined = ''
    splitB.forEach((value, index) => {
      const row = parseInt(value[0] + value[5], 2)
      const column = parseInt(value.substr(1, 4), 2);
      const num = this.getNumber(row, column, this.sArrays[index]);
      joined = joined + num;
    })
    return this.permutations(joined, this.finalPermutation);
  }

  private permutations(value: string, permutatationTable: number[]): string {
    let result = ''
    for (let i = 0; i < permutatationTable.length; i++) {
      result = result + value[permutatationTable[i] - 1];
    }
    return result;
  }

  private expand(value: string) {
    let result = '';
    this.selection.forEach(index => result = result + value[index - 1])
    return result;
  }

  private getNumber(row: number, column: number, array: number[]) {
    const index = (row * 16) + column;
    const arr = array[index];
    let n = arr.toString(2);
    return "0000".substr(n.length) + n;
  }

  private splitKey(value: string, length: number): string[] {
    let C0 = value.substr(0, length)
    let D0 = value.substr(length, length)
    return [C0, D0];
  }
}
