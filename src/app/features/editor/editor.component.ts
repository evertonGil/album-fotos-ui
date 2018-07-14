import { Component, OnInit } from '@angular/core';
import { MdcHelper } from '../../helpers/mdc.helper';
import { ImagemModel } from '../../shared/imagem/imagem.model';
import { editorService } from './editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class editorComponent implements OnInit {

  constructor(
    private readonly editorService: editorService
  ) { }

  listaImagens: ImagemModel[];
  objectDragged;
  mousePosX = 0;
  mousePosY = 0;
  elemPosX = 0;
  elemPosY = 0;
  elemDragged: HTMLLIElement;

  ngOnInit() {
    this.listaImagens = this.editorService.getImagens();

    this.listaImagens.forEach(imagem => {
      imagem.path = "/assets/images/_DSC0045.JPG";
      imagem.proporcao = {fracao: MdcHelper.reduzirFracao(imagem.largura, imagem.altura), decimal: imagem.largura/imagem.altura}
    })
  }

  inicioDeDrag(event){
    event.stopPropagation();
    
    console.log('inicio',event);
    this.elemDragged = event.path.find(ele => ele.classList.contains('preview_dragable'));

    this.mousePosX = event.clientX;
    this.mousePosY = event.clientY;

    document.onmousemove = this.moveDrag.bind(this);
    document.onmouseup = this.closeDragElement;

  }
  saber(){
    console.log('bubbled');
  }
  moveDrag(e){
    console.log('mouseMove', e.clientX, e.clientY);
    this.elemPosX = this.mousePosX - e.clientX;
    this.elemPosY = this.mousePosY - e.clientY;

    this.elemDragged.style.position = 'fixed';
    this.elemDragged.style.top = (this.elemDragged.offsetTop - this.elemPosY) + "px";
    this.elemDragged.style.left = (this.elemDragged.offsetLeft - this.elemPosX) + "px";

  }
  
  closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  fimDeDrag(event){
    const li = event.target;
    this.objectDragged = undefined;
    li.style.opacity = '1';
  }



  dragenter(event){
    console.log('dragenter', event);
    event.cancelBubble = true;
    if(event.target !== this.objectDragged){
      event.target.classList.add('over');
    }
  }
}
