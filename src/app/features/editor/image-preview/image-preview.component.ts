import { Component, OnInit, Input, EventEmitter, OnChanges } from '@angular/core';
import { ImagemModel } from '../../../shared/imagem/imagem.model';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit, OnChanges {

  @Input() listaImagens: ImagemModel[];

  largutaItem = 200;
  alturaItem = 180;
  larguraTotal = 0;

  arquivosEmitter: EventEmitter<any>;

  urlPublica = 'http://localhost:3000';

  mousePosX = 0;
  mousePosY = 0;
  elemPosX = 0;
  elemPosY = 0;
  elemDragged;

  constructor(
    private editorService: EditorService
  ) { }

  ngOnInit() {

  }

  ngOnChanges() {
    console.log('image-preview', this.listaImagens);
    if (this.listaImagens && this.listaImagens.length) {
      this.larguraTotal = this.listaImagens.length * this.largutaItem;
    }
  }

  aoEscolherArquivos(arquivo) {
    console.log('aoEscolherArquivos', arquivo);
    this.listaImagens.push(arquivo);

    this.editorService.uploadImagens(1, arquivo).subscribe( arquivoApi => {

      this.listaImagens.splice(this.listaImagens.indexOf(arquivo), 1, arquivoApi);
    });
  }

  inicioDeDrag(event, imagem) {

    event.preventDefault();

    this.editorService.objectDragged = imagem;
    this.elemDragged = event.target;
    this.elemDragged.style.width = this.elemDragged.width + 'px';
    this.elemDragged.style.height = this.elemDragged.height + 'px';


    this.mousePosX = event.clientX;
    this.mousePosY = event.clientY;

    document.onmousemove = this.moveDrag.bind(this);
    document.onmouseup = this.finalDeDrag.bind(this);

  }

  moveDrag(e) {
    this.elemDragged.style.position = 'fixed';
    this.elemPosX = e.clientX + 5;
    this.elemPosY = e.clientY + 5;

    this.elemDragged.style.left = this.elemPosX + "px";
    this.elemDragged.style.top = this.elemPosY + "px";
  }

  finalDeDrag(_) {
    this.elemDragged.style.top = 'auto';
    this.elemDragged.style.left = 'auto';
    this.editorService.objectDragged = undefined;
    this.elemDragged.style.position = 'static';
    document.onmousemove = null;
    document.onmouseup = null;
  }

  deletarImagem(idImagem: string, index: number) {
    console.log('arquivo sendo excluido', idImagem);
    this.editorService.deletarImagemPorId(1, idImagem)
    .subscribe( result => {
      if(result){
        this.listaImagens.splice(index, 1);
      }
    })
  }
}
