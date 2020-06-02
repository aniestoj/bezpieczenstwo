import {Component} from '@angular/core';
import {RootState} from "../../../store/store";
import {select, Store} from "@ngrx/store";
import {fileDecryptRequested, fileEncryptRequested} from "../../store/images.actions";
import {AlgorithmType} from "../../model/algorithmType";
import {selectFileToDecrypt, selectFileToEncrypt, selectIsProcessing} from "../../store/images.selectors";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  isProcessing$ = this.store$.pipe(select(selectIsProcessing))
  fileToEncrypt$ = this.store$.pipe(select(selectFileToEncrypt))
  fileToDecrypt$ = this.store$.pipe(select(selectFileToDecrypt))

  constructor(private store$: Store<RootState>) {
  }

  encryptDES() {
    this.store$.dispatch(fileEncryptRequested({algorithmType: AlgorithmType.DES}))
  }

  encryptSDES() {
    this.store$.dispatch(fileEncryptRequested({algorithmType: AlgorithmType.SDES}))
  }

  decryptDES() {
    this.store$.dispatch(fileDecryptRequested({algorithmType: AlgorithmType.DES}))
  }

  decryptSDES() {
    this.store$.dispatch(fileDecryptRequested({algorithmType: AlgorithmType.SDES}))
  }

}
