import {Component} from '@angular/core';
import {
  fileToEncryptRemoved,
  newFileToEncryptSelected,
  saveFileToEncryptRequested
} from "../../../store/images.actions";
import {RootState} from "../../../../store/store";
import {select, Store} from "@ngrx/store";
import {selectFileToEncrypt} from "../../../store/images.selectors";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-encrypt-menu',
  templateUrl: './encrypt-menu.component.html',
  styleUrls: ['./encrypt-menu.component.scss']
})
export class EncryptMenuComponent {
  fileToEncrypt$ = this.store$.pipe(select(selectFileToEncrypt))

  constructor(private store$: Store<RootState>,
              private snackbarService: SnackbarService) {
  }

  onChange(file: File) {
    if (file) {
      if (this.fileFormat(file) === 'png' || this.fileFormat(file) === 'jpg' || this.fileFormat(file) === 'jpeg' || this.fileFormat(file) === 'bmp') {
        this.store$.dispatch(newFileToEncryptSelected({file}))
      } else {
        this.snackbarService.open('Wrong file format!')
      }
    }
  }

  save() {
    this.store$.dispatch(saveFileToEncryptRequested());
  }

  remove() {
    this.store$.dispatch(fileToEncryptRemoved());
  }

  private fileFormat(file: File): string {
    return file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
  }
}
