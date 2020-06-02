import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {selectFileToDecryptUrl} from "../../../store/images.selectors";
import {RootState} from "../../../../store/store";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-decrypt-preview',
  templateUrl: './decrypt-preview.component.html',
  styleUrls: ['./decrypt-preview.component.scss']
})
export class DecryptPreviewComponent implements OnInit, OnDestroy {
  imageUrl: SafeUrl;
  fileToDecryptUrl$ = this.store$.pipe(select(selectFileToDecryptUrl))
  private subscription: Subscription;

  constructor(private store$: Store<RootState>,
              private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.subscription = this.fileToDecryptUrl$
      .subscribe(fileUrl => {
        this.imageUrl = this.domSanitizer.bypassSecurityTrustUrl(fileUrl)
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
