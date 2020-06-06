import {Injectable} from '@angular/core';
import {EncryptionType} from "../model/encryptionType";
import {AlgorithmType} from "../model/algorithmType";
import {EncryptDesService} from "./encrypt-des.service";
import {EncryptSdesService} from "./encrypt-sdes.service";

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor(private encryptDesService: EncryptDesService,
              private encryptSdesService: EncryptSdesService) {
  }

  encryption(file: string | ArrayBuffer, type: EncryptionType, algorithmType: AlgorithmType, secret: string) {
    let fileData = '';
    if (file.toString().includes('IDAT')) {
      console.log(type + ' ' + algorithmType + ' PNG')
      fileData = this.idat(file, type, algorithmType, secret);
    } else if (file.toString().includes('BM8')) {
      console.log(type + ' ' + algorithmType + ' BMP')
      fileData = this.bmp(file, type, algorithmType, secret);
    } else {
      console.log(type + ' ' + algorithmType + ' JPEG')
      fileData = this.ifif(file, type, algorithmType, secret);
    }
    const bytes = new Uint8Array(fileData.length);
    for (let i = 0; i < fileData.length; i++) {
      bytes[i] = fileData.charCodeAt(i);
    }
    return bytes;
  }

  private idat(file: string | ArrayBuffer, type: EncryptionType, algorithmType: AlgorithmType, secret: string) {
    const regexp = /IDAT|IEND?/gi;
    const stringData = file.toString();
    const dataParts = stringData.split(regexp);
    const idats = dataParts.slice(1, dataParts.length - 1);
    const data = idats
      .map((value, index) => (type === EncryptionType.ENCRYPTION)
        ? algorithmType === AlgorithmType.DES ? this.encryptDES(value, secret) : this.encryptSDES(value, secret)
        : algorithmType === AlgorithmType.DES ? this.decryptDES(value, secret) : this.decryptSDES(value, secret)
      )
      .reduce((accumulator, current) => accumulator + 'IDAT' + current, '')
    return dataParts[0] + data + 'IEND' + dataParts[dataParts.length - 1];
  }

  private ifif(file: string | ArrayBuffer, type: EncryptionType, algorithmType: AlgorithmType, secret: string) {
    const stringData = file.toString();
    const dataParts = [stringData.substr(0, 512), stringData.substr(512, stringData.length)];
    const idats = dataParts.slice(1, dataParts.length);
    const data = idats
      .map((value, index) => (type === EncryptionType.ENCRYPTION)
        ? algorithmType === AlgorithmType.DES ? this.encryptDES(value, secret) : this.encryptSDES(value, secret)
        : algorithmType === AlgorithmType.DES ? this.decryptDES(value, secret) : this.decryptSDES(value, secret)
      ).reduce((accumulator, current) => accumulator + current, '')

    return dataParts[0] + data;
  }

  private bmp(file: string | ArrayBuffer, type: EncryptionType, algorithmType: AlgorithmType, secret: string) {
    const stringData = file.toString();
    const dataParts = [stringData.substr(0, 1024), stringData.substr(1024, stringData.length)];
    const idats = dataParts.slice(1, dataParts.length);
    const data = idats
      .map((value, index) => (type === EncryptionType.ENCRYPTION)
        ? algorithmType === AlgorithmType.DES ? this.encryptDES(value, secret) : this.encryptSDES(value, secret)
        : algorithmType === AlgorithmType.DES ? this.decryptDES(value, secret) : this.decryptSDES(value, secret)
      ).reduce((accumulator, current) => accumulator + current, '')

    return dataParts[0] + data;
  }

  private encryptDES(value: string, secret: string) {
    let res = ''
    for (let i = 0; i < Math.round(value.length / 8); i++) {
      res = res + this.encryptDesService.encode(value.substr(i * 8, 8), secret);
    }
    res = res + value.substr(Math.round(value.length / 8) * 8, value.length)
    return res;
  }

  private decryptDES(value: string, secret: string) {
    let res = ''
    for (let i = 0; i < Math.round(value.length / 8); i++) {
      res = res + this.encryptDesService.decode(value.substr(i * 8, 8), secret);
    }
    res = res + value.substr(Math.round(value.length / 8) * 8, value.length)
    return res;
  }

  private encryptSDES(value: string, secret: string) {
    let res = '';
    for (let i = 0; i < value.length; i++) {
      res = res + this.encryptSdesService.encode(value[i], secret)
    }
    return res;
  }

  private decryptSDES(value: string, secret: string) {
    let res = '';
    for (let i = 0; i < value.length; i++) {
      res = res + this.encryptSdesService.decode(value[i], secret)
    }
    return res;
  }
}
