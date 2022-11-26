import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { ImagemModel } from './imagem.model';

@Component({
  selector: 'app-imagem',
  templateUrl: './imagem.component.html',
  styleUrls: ['./imagem.component.css']
})
export class ImagemComponent implements OnInit, OnChanges {

  @ViewChild('imagemDiv') imagemDiv: ElementRef;
  @ViewChild('imagem') imagem: ElementRef;
  @ViewChild('imagemBorder') imagemBorder: ElementRef;
  imagemExiste = false;

  @Input() imagemObj: ImagemModel;

  imagemProps: any = {};
  divProps: any = {};
  constructor() {

  }

  ngOnInit() {
    this.definirHtml();
  }

  ngOnChanges() {
    this.definirHtml();
  }

  definirHtml() {

    // Propriedade da imagem
    this.imagemProps.height =`${this.imagemObj.altura}px`;
    this.imagemProps.width =`${this.imagemObj.largura}px`;
    this.imagemProps.alt = this.imagemObj.titulo;

    // Propriedade de div quando nâo tem path de imagem
    this.divProps.width =`${this.imagemObj.largura}px`
    this.divProps.height =`${this.imagemObj.altura}px`
    
  }

}
