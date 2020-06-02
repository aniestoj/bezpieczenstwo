import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {selectFileToEncryptUrl} from "../../../store/images.selectors";
import {RootState} from "../../../../store/store";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-encrypt-preview',
  templateUrl: './encrypt-preview.component.html',
  styleUrls: ['./encrypt-preview.component.scss']
})
export class EncryptPreviewComponent implements OnInit, OnDestroy {
  imageUrl: SafeUrl;
  fileToEncryptUrl$ = this.store$.pipe(select(selectFileToEncryptUrl))
  private subscription: Subscription;

  constructor(private store$: Store<RootState>,
              private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.subscription = this.fileToEncryptUrl$
      .subscribe(fileUrl => {
        this.imageUrl = this.domSanitizer.bypassSecurityTrustUrl(fileUrl)
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
