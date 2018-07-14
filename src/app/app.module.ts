import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HelpersModule } from './helpers/helpers.module';
import { editorComponent } from './features/editor/editor.component';
import { ImagePreviewComponent } from './features/editor/image-preview/image-preview.component';
import { editorService } from './features/editor/editor.service';
import { ApresentacaoComponent } from './features/apresentacao/apresentacao.component';

import { ImagemComponent } from './shared/imagem/imagem.component';

@NgModule({
  declarations: [
    AppComponent,
    editorComponent,
    ImagemComponent,
    ImagePreviewComponent,
    ApresentacaoComponent
  ],
  imports: [
    AppRoutingModule,
    HelpersModule,
    BrowserModule
  ],
  providers: [editorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
