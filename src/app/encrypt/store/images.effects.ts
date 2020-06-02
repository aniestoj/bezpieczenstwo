import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  fileDecryptRequested,
  fileDecryptSucceeded,
  fileEncryptRequested,
  fileEncryptSucceeded,
  newFileToDecryptLoaded,
  newFileToDecryptSelected,
  newFileToEncryptLoaded,
  newFileToEncryptSelected,
  saveFileToDecryptRequested,
  saveFileToEncryptRequested,
  secretUpdated
} from "./images.actions";
import {tap, withLatestFrom} from "rxjs/operators";
import {RootState} from "../../store/store";
import {select, Store} from "@ngrx/store";
import {AlgorithmType} from "../model/algorithmType";
import {selectDecrypt, selectEncrypt} from "./images.selectors";
import {saveAs} from 'file-saver'
import {SnackbarService} from "../services/snackbar.service";
import {EncryptionService} from "../services/encryption.service";
import {EncryptionType} from "../model/encryptionType";

@Injectable()
export class ImagesEffects {

  newFileToEncryptSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newFileToEncryptSelected, fileDecryptSucceeded),
      tap((action) => {
        const reader = new FileReader();
        reader.readAsDataURL(action.file);
        reader.onload = (event) => {
          this.store$.dispatch(newFileToEncryptLoaded({fileUrl: reader.result.toString()}))
        };
      })
    ), {dispatch: false}
  );

  newFileToDecryptSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newFileToDecryptSelected, fileEncryptSucceeded),
      tap((action) => {
        const reader = new FileReader();
        reader.readAsDataURL(action.file);
        reader.onload = (event) => {
          this.store$.dispatch(newFileToDecryptLoaded({fileUrl: reader.result.toString()}))
        };
      })
    ), {dispatch: false}
  );

  secretUpdated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(secretUpdated),
      tap((action) => {
        this.snackbarService.open('Key secret updated!')
      })
    ), {dispatch: false}
  );

  fileEncryptRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileEncryptRequested),
      withLatestFrom(this.store$.pipe(select(selectEncrypt))),
      tap(([action, encrypt]: [any, { file: File, fileUrl: string, secret: string }]) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          let bytes;
          if (action.algorithmType === AlgorithmType.DES) {
            this.snackbarService.open('Start encrypt DES')
            bytes = this.encryptionService.encryption(fileReader.result, EncryptionType.ENCRYPTION, AlgorithmType.DES, encrypt.secret);
          } else if (action.algorithmType === AlgorithmType.SDES) {
            bytes = this.encryptionService.encryption(fileReader.result, EncryptionType.ENCRYPTION, AlgorithmType.SDES, encrypt.secret);
            this.snackbarService.open('Start encrypt SDES')
          }
          const blob = new Blob([bytes], {type: encrypt.file.type});
          const file = new File([blob], encrypt.file.name);
          this.store$.dispatch(fileEncryptSucceeded({file}))
        };
        fileReader.readAsBinaryString(encrypt.file);
      })
    ), {dispatch: false}
  );

  fileDecryptRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileDecryptRequested),
      withLatestFrom(this.store$.pipe(select(selectDecrypt))),
      tap(([action, decrypt]: [any, { file: File, fileUrl: string, secret: string }]) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          let bytes;
          if (action.algorithmType === AlgorithmType.DES) {
            this.snackbarService.open('Start decrypt DES')
            bytes = this.encryptionService.encryption(fileReader.result, EncryptionType.DECRYPTION, AlgorithmType.DES, decrypt.secret);
          } else if (action.algorithmType === AlgorithmType.SDES) {
            bytes = this.encryptionService.encryption(fileReader.result, EncryptionType.DECRYPTION, AlgorithmType.SDES, decrypt.secret);
            this.snackbarService.open('Start decrypt SDES')
          }
          const blob = new Blob([bytes], {type: decrypt.file.type});
          const file = new File([blob], decrypt.file.name);
          this.store$.dispatch(fileDecryptSucceeded({file}))
        };
        fileReader.readAsBinaryString(decrypt.file);
      })
    ), {dispatch: false}
  );

  fileEncryptSucceeded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileEncryptSucceeded),
      tap((action) => {
        this.snackbarService.open('Encryption Succeeded!')
      })
    ), {dispatch: false}
  );

  fileDecryptSucceeded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileDecryptSucceeded),
      tap((action) => {
        this.snackbarService.open('Decryption Succeeded!')
      })
    ), {dispatch: false}
  );

  saveFileToEncryptRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveFileToEncryptRequested),
      withLatestFrom(this.store$.pipe(select(selectEncrypt))),
      tap(([action, file]: [any, { file: File, fileUrl: string, secret: string }]) => {
        if (file) {
          saveAs(file.fileUrl, file.file.name);
          this.snackbarService.open('Image saved!')
        } else {
          this.snackbarService.open('Error occured!')
        }
      })
    ), {dispatch: false}
  );

  saveFileToDecryptRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveFileToDecryptRequested),
      withLatestFrom(this.store$.pipe(select(selectDecrypt))),
      tap(([action, file]: [any, { file: File, fileUrl: string, secret: string }]) => {
        if (file) {
          saveAs(file.fileUrl, file.file.name);
          this.snackbarService.open('Image saved!')
        } else {
          this.snackbarService.open('Error occured!')
        }
      })
    ), {dispatch: false}
  );

  constructor(private actions$: Actions,
              private store$: Store<RootState>,
              private snackbarService: SnackbarService,
              private encryptionService: EncryptionService) {
  }
}
