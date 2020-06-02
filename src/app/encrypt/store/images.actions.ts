import {createAction, props} from '@ngrx/store';
import {AlgorithmType} from "../model/algorithmType";

export const newFileToEncryptSelected = createAction('[FILE TO ENCRYPT] New file selected', props<{ file: File }>());
export const newFileToEncryptLoaded = createAction('[FILE TO ENCRYPT] New file loaded', props<{ fileUrl: string }>());
export const fileToEncryptRemoved = createAction('[FILE TO ENCRYPT] File to encrypt removed');

export const newFileToDecryptSelected = createAction('[FILE TO DECRYPT] New file selected', props<{ file: File }>());
export const newFileToDecryptLoaded = createAction('[FILE TO DECRYPT] New file loaded', props<{ fileUrl: string }>());
export const fileToDecryptRemoved = createAction('[FILE TO DECRYPT] File to decrypt removed');

export const secretUpdated = createAction('[SECRET] Updated', props<{ secret: string }>());

export const fileEncryptRequested = createAction('[ENCRYPT] Encrypt file requested', props<{ algorithmType: AlgorithmType }>());
export const fileEncryptSucceeded = createAction('[ENCRYPT] File encrypted', props<{ file: File }>());

export const fileDecryptRequested = createAction('[DECRYPT] Decrypt file requested', props<{ algorithmType: AlgorithmType }>());
export const fileDecryptSucceeded = createAction('[DECRYPT] File decrypted', props<{ file: File }>());

export const saveFileToEncryptRequested = createAction('[SAVE] Save file to encrypt requested');
export const saveFileToDecryptRequested = createAction('[SAVE] Save file to decrypt requested');

