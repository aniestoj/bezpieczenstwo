import {createFeatureSelector, createSelector} from '@ngrx/store';
import {EncryptState} from './images.reducer';

export const encryptState = createFeatureSelector<EncryptState>('images');

export const selectEncrypt = createSelector(
  encryptState,
  (state: EncryptState) => state.fileToEncrypt ? {file: state.fileToEncrypt, fileUrl: state.fileToEncryptUrl, secret: state.secret} : undefined
);

export const selectFileToEncrypt = createSelector(
  encryptState,
  (state: EncryptState) => state.fileToEncrypt ? state.fileToEncrypt : undefined
);

export const selectFileToEncryptUrl = createSelector(
  encryptState,
  (state: EncryptState) => state.fileToEncryptUrl ? state.fileToEncryptUrl : undefined
);

export const selectDecrypt = createSelector(
  encryptState,
  (state: EncryptState) => state.fileToDecrypt ? {file: state.fileToDecrypt, fileUrl: state.fileToDecryptUrl, secret: state.secret} : undefined
);

export const selectFileToDecrypt = createSelector(
  encryptState,
  (state: EncryptState) => state.fileToDecrypt ? state.fileToDecrypt : undefined
);

export const selectFileToDecryptUrl = createSelector(
  encryptState,
  (state: EncryptState) => state.fileToDecryptUrl ? state.fileToDecryptUrl : undefined
);

export const selectSecret = createSelector(
  encryptState,
  (state: EncryptState) => state.secret
);

export const selectIsProcessing = createSelector(
  encryptState,
  (state: EncryptState) => state.isProcessing
);
