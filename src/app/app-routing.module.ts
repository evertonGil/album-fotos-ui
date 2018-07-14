import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { editorComponent } from './features/editor/editor.component';

const rotas: Routes = [
  {path: 'editor', component: editorComponent},
  {path: '', redirectTo: 'editor', pathMatch: 'full'}
]
@NgModule({
  imports: [
    RouterModule.forRoot(rotas),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
