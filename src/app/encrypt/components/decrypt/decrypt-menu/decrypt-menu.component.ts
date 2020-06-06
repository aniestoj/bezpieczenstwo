import {Component} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {RootState} from "../../../../store/store";
import {
  fileToDecryptRemoved,
  newFileToDecryptSelected,
  saveFileToDecryptRequested
} from "../../../store/images.actions";
import {selectFileToDecrypt} from "../../../store/images.selectors";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-decrypt-menu',
  templateUrl: './decrypt-menu.component.html',
  styleUrls: ['./decrypt-menu.component.scss']
})
export class DecryptMenuComponent {
  fileToDecrypt$ = this.store$.pipe(select(selectFileToDecrypt))

  constructor(private store$: Store<RootState>,
              private snackbarService: SnackbarService) {
  }

  onChange(file: File) {
    if (file) {
      if (this.fileFormat(file) === 'png' || this.fileFormat(file) === 'jpg' || this.fileFormat(file) === 'jpeg' || this.fileFormat(file) === 'bmp') {
        this.store$.dispatch(newFileToDecryptSelected({file}))
      } else {
        this.snackbarService.open('Wrong file format!')
      }
    }
  }

  save() {
    this.store$.dispatch(saveFileToDecryptRequested());
  }

  remove() {
    this.store$.dispatch(fileToDecryptRemoved());
  }

  private fileFormat(file: File): string {
    return file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
  }
}
