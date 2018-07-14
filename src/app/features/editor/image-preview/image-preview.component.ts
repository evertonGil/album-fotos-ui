import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ImagemModel } from '../../../shared/imagem/imagem.model';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit {

  @Input() imagemObj: ImagemModel;
  propList: any[];
  // imagemPreview = new ImagemModel();

  // @ViewChild('bloco') bloco: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    // Object.assign(this.imagemPreview, this.imagemObj);

    // console.log(this.imagemPreview, this.imagemObj)
    this.propList = Object.keys(this.imagemObj);

    // this.bloco.nativeElement.style.width = this.imagemObj.largura  + 'px' ;
    // this.bloco.nativeElement.style.height = this.imagemObj.altura  + 'px' ;
  }

}
