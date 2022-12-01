import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HelpersModule } from './helpers/helpers.module';
import { editorComponent } from './features/editor/editor.component';
import { ImagePreviewComponent } from './features/editor/image-preview/image-preview.component';
import { EditorService } from './features/editor/editor.service';
import { ApresentacaoComponent } from './features/apresentacao/apresentacao.component';

import { ImagemComponent } from './shared/imagem/imagem.component';
import { DetalhesComponent } from './features/editor/image-preview/detalhes/detalhes.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { UploaderComponent } from './shared/uploader/uploader.component';
// import { MzProgressModule } from 'ngx-materialize'

@NgModule({
  declarations: [
    AppComponent,
    editorComponent,
    ImagemComponent,
    ImagePreviewComponent,
    ApresentacaoComponent,
    DetalhesComponent,
    LoaderComponent,
    UploaderComponent
  ],
  imports: [
    AppRoutingModule,
    HelpersModule,
    BrowserModule,
    // MzProgressModule,
    HttpClientModule
  ],
  providers: [EditorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
