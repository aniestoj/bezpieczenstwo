import {Action, createReducer, on} from '@ngrx/store';
import {
  fileDecryptRequested,
  fileDecryptSucceeded,
  fileEncryptRequested,
  fileEncryptSucceeded,
  fileToDecryptRemoved,
  fileToEncryptRemoved,
  newFileToDecryptLoaded,
  newFileToDecryptSelected,
  newFileToEncryptLoaded,
  newFileToEncryptSelected,
  secretUpdated
} from "./images.actions";

export const IMAGE_PLACEHOLDER = "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg";

export interface EncryptState {
  isLoading: boolean;
  fileToEncrypt?: File;
  fileToEncryptUrl: string;
  fileToDecrypt?: File;
  fileToDecryptUrl: string;
  secret: string;
  isProcessing: boolean;
}

const initialState: EncryptState = {
  isLoading: false,
  fileToEncryptUrl: IMAGE_PLACEHOLDER,
  fileToDecryptUrl: IMAGE_PLACEHOLDER,
  secret: 'secret00',
  isProcessing: false
};

const reducer = createReducer(
  initialState,
  on(newFileToEncryptSelected, (state, {file}) => ({...state, fileToEncrypt: file})),
  on(newFileToEncryptLoaded, (state, {fileUrl}) => ({...state, fileToEncryptUrl: fileUrl})),
  on(fileToEncryptRemoved, (state) => ({
    ...state,
    fileToEncrypt: undefined,
    fileToEncryptUrl: IMAGE_PLACEHOLDER
  })),

  on(newFileToDecryptSelected, (state, {file}) => ({...state, fileToDecrypt: file})),
  on(newFileToDecryptLoaded, (state, {fileUrl}) => ({...state, fileToDecryptUrl: fileUrl})),
  on(fileToDecryptRemoved, (state) => ({
    ...state,
    fileToDecrypt: undefined,
    fileToDecryptUrl: IMAGE_PLACEHOLDER
  })),

  on(secretUpdated, (state, {secret}) => ({...state, secret})),

  on(fileEncryptRequested, (state) => ({...state, isProcessing: true})),
  on(fileEncryptSucceeded, (state, {file}) => ({
    ...state,
    isProcessing: false,
    fileToDecrypt: file,
    fileToDecryptUrl: IMAGE_PLACEHOLDER
  })),

  on(fileDecryptRequested, (state) => ({...state, isProcessing: true})),
  on(fileDecryptSucceeded, (state, {file}) => ({
    ...state,
    isProcessing: false,
    fileToEncrypt: file,
    fileToEncryptUrl: IMAGE_PLACEHOLDER
  }))
);

export function imagesReducer(state: EncryptState | undefined, action: Action) {
  return reducer(state, action);
}
