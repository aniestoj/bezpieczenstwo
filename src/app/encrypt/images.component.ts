import {Component, OnDestroy, OnInit} from '@angular/core';
import {RootState} from "../store/store";
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {selectIsProcessing} from "./store/images.selectors";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(private store$: Store<RootState>,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.subscription = this.store$.pipe(select(selectIsProcessing))
      .subscribe(isProcessing => {
        if (isProcessing) {
          this.spinner.show();
        } else {
          this.spinner.hide();
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
