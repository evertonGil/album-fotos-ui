import { Injectable } from '@angular/core';
import { imagenseditorMock } from './mock-imagens';
import { ImagemModel } from '../../shared/imagem/imagem.model';

@Injectable()
export class editorService {
  
  constructor() {
    
   }

  getImagens(): ImagemModel[]{
    return imagenseditorMock;
  }

}
