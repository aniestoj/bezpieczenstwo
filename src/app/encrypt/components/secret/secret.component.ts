import {Component, OnDestroy, OnInit} from '@angular/core';
import {RootState} from "../../../store/store";
import {select, Store} from "@ngrx/store";
import {secretUpdated} from "../../store/images.actions";
import {selectSecret} from "../../store/images.selectors";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss']
})
export class SecretComponent implements OnInit, OnDestroy {
  secret = ''
  editable = false;
  secret$ = this.store$.pipe(select(selectSecret))
  private subscription: Subscription;

  constructor(private store$: Store<RootState>) {
  }

  ngOnInit(): void {
    this.subscription = this.secret$
      .pipe(take(1))
      .subscribe(secret => this.secret = secret);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save() {
    this.store$.dispatch(secretUpdated({secret: this.secret}))
  }
}
