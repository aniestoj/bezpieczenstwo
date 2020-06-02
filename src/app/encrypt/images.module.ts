import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImagesComponent} from './images.component';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {imagesReducer} from './store/images.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ImagesEffects} from './store/images.effects';
import {ImagesRoutingModule} from "./images-routing.module";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {EncryptPreviewComponent} from './components/encrypt/encrypt-preview/encrypt-preview.component';
import {DecryptPreviewComponent} from './components/decrypt/decrypt-preview/decrypt-preview.component';
import {SecretComponent} from './components/secret/secret.component';
import {EncryptMenuComponent} from './components/encrypt/encrypt-menu/encrypt-menu.component';
import {DecryptMenuComponent} from './components/decrypt/decrypt-menu/decrypt-menu.component';
import {ActionsComponent} from './components/actions/actions.component';
import {DecryptComponent} from './components/decrypt/decrypt.component';
import {EncryptComponent} from './components/encrypt/encrypt.component';
import {MatButtonModule} from "@angular/material/button";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('images', imagesReducer),
    EffectsModule.forFeature([ImagesEffects]),
    ImagesRoutingModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    NgxSpinnerModule
  ],
  declarations: [
    ImagesComponent,
    SecretComponent,
    ActionsComponent,
    DecryptComponent,
    DecryptMenuComponent,
    DecryptPreviewComponent,
    EncryptComponent,
    EncryptMenuComponent,
    EncryptPreviewComponent
  ]
})
export class ImagesModule {
}
