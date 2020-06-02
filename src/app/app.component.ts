import {Component, OnInit} from '@angular/core';
import {EncryptSdesService} from "./encrypt/services/encrypt-sdes.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private encryptSdesService: EncryptSdesService) {
  }

  ngOnInit(): void {
    const value = 'a'
    const enc = this.encryptSdesService.encode(value, '0111001011')
    const dec = this.encryptSdesService.decode(enc, '0111001011')
    console.log(value)
    console.log(enc)
    console.log(dec)
  }

}
