import {Injectable} from '@angular/core';
import {SdesKeysService} from "./sdes-keys.service";

@Injectable({
  providedIn: 'root'
})
export class EncryptSdesService {
  private IP = [2, 6, 3, 1, 4, 8, 5, 7];
  private reverse = [4, 1, 3, 5, 7, 2, 8, 6];
  private expand = [4, 1, 2, 3, 2, 3, 4, 1];
  private S0 = [
    ['01', '00', '11', '10'],
    ['11', '10', '01', '00'],
    ['00', '10', '01', '11'],
    ['11', '01', '11', '10'],
  ]
  private S1 = [
    ['00', '01', '10', '11'],
    ['10', '00', '01', '11'],
    ['11', '00', '01', '00'],
    ['10', '01', '00', '11'],
  ]
  private P4 = [2, 4, 3, 1];

  constructor(private sdesKeysService: SdesKeysService) {
  }

  encode(value: string, secret: string) {
    const key = this.strToBin(secret).substr(0, 10);
    const keys = this.sdesKeysService.generate(key);
    const val = this.strToBin(value);
    const res = this.encrypt(val, keys);
    return String.fromCharCode(parseInt(res, 2));
  }

  decode(value: string, secret: string) {
    const key = this.strToBin(secret).substr(0, 10)
    const keys = this.sdesKeysService.generate(key).reverse();
    const val = this.strToBin(value);
    const res = this.encrypt(val, keys);
    return String.fromCharCode(parseInt(res, 2));
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

  private encrypt(value: string, keys: string[]) {
    const perm = this.permutations(value, this.IP);
    const first = this.calculate(perm, keys[0]);
    const second = this.calculate2(first, keys[1]);
    return this.permutations(second, this.reverse);
  }

  private calculate(value: string, key: string): string {
    const split = this.splitKey(value, 4)
    const left = split[0]
    const right = split[1]
    const expanded = this.permutations(right, this.expand)
    const splitRes = this.splitKey(this.add(expanded, key), 4)
    const left1 = this.box(splitRes[0], this.S0)
    const right1 = this.box(splitRes[1], this.S1)
    const resPerm = this.permutations(left1 + right1, this.P4)
    const fin = this.add(left, resPerm) + right;
    const newSplit = this.splitKey(fin, 4)
    return newSplit[1] + newSplit[0]
  }

  private calculate2(value: string, key: string): string {
    const split = this.splitKey(value, 4)
    const left = split[0]
    const right = split[1]
    const expanded = this.permutations(right, this.expand)
    const splitRes = this.splitKey(this.add(expanded, key), 4)
    const left1 = this.box(splitRes[0], this.S0)
    const right1 = this.box(splitRes[1], this.S1)
    const resPerm = this.permutations(left1 + right1, this.P4)
    return this.add(left, resPerm) + right;
  }

  private box(value: string, arr: any[]) {
    const row = parseInt(value[0] + value[3], 2);
    const column = parseInt(value[1] + value[2], 2);
    return arr[row][column];
  }

  private add(a: string, b: string) {
    let xor = ''
    for (let i = 0; i < a.length; i++) {
      xor = xor + (a[i] !== b[i] ? 1 : 0)
    }
    return xor;
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
