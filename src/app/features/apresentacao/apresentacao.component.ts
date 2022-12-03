import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ImagemModel } from '../../shared/imagem/imagem.model';
import { EditorService } from '../editor/editor.service';
import html2canvas from 'html2canvas';
import { PubSub } from '../../shared/pubsub';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.css']
})
export class ApresentacaoComponent implements OnInit {

  scaleCss = 0.21;

  @Input() listaImagens;
  @ViewChild('apresentacaoImagens') apresentacaoImagens: ElementRef;
  @ViewChild('wrapper') wrapperApresentacao: ElementRef;
  @ViewChild('modal') modal: ElementRef;

  positionLeftOriginal;
  positionTopOriginal;
  htmlDivImagens: HTMLDivElement;
  htmlDivWrapper: HTMLDivElement;
  mouseX;
  mouseY;
  translateX = 0;
  translateY = 0;
  mousePoriginalX;
  mousePoriginalY;
  elPOriginalX;
  elPOriginalY;
  valorZoomPadrao = 0.07;
  modalAberto: boolean;
  pubSub: PubSub;

  constructor(
    private editorService: EditorService
  ) {
    this.pubSub = new PubSub();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.htmlDivImagens = this.apresentacaoImagens.nativeElement;
    this.htmlDivWrapper = this.wrapperApresentacao.nativeElement;

    this.htmlDivImagens.style.left = this.htmlDivImagens.offsetLeft + 'px';
    this.htmlDivImagens.style.top = this.htmlDivImagens.offsetTop + 'px';
    this.positionLeftOriginal = this.htmlDivImagens.offsetLeft;
    this.positionTopOriginal = this.htmlDivImagens.offsetTop;
    this.htmlDivImagens.style.transform = `scale(${this.scaleCss}, ${this.scaleCss})`;

    fromEvent(this.wrapperApresentacao.nativeElement, 'mousemove').subscribe((e: any) => {
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
    });
  }

  imprimir() {
    const apresentacao: HTMLElement = this.apresentacaoImagens.nativeElement;
    const modalInstance: HTMLElement = this.modal.nativeElement;
    this.htmlDivImagens.style.transform = `scale(1, 1)`;
    this.pubSub.publish('SHOWLOADER', true);

    html2canvas(apresentacao, { windowWidth: 5842, logging: false })
      .then((canvas) => {
        // console.log(modalInstance);
        this.modalAberto = true;
        const link = document.createElement('a');
        const image = document.createElement('img');
        const imagData = canvas.toDataURL('image/jpeg');
        image.src = imagData;
        link.download = 'html2canvas.jpg';
        link.href = image.src;
        link.click();
        modalInstance.style.display = 'block';

        this.htmlDivImagens.style.transform = `scale(${this.scaleCss}, ${this.scaleCss})`;

        this.pubSub.publish('SHOWLOADER', false);
      })
      .catch(error => {
        // console.error('oops, something went wrong!', error);
      });;
  };

  mouseup(_, item: ImagemModel, i: number) {
    if (this.editorService.objectDragged) {
      this.listaImagens[i].path = this.editorService.objectDragged.path;
    }
  }

  mousedown(event) {
    event.preventDefault();
    this.elPOriginalX = this.htmlDivImagens.offsetLeft;
    this.elPOriginalY = this.htmlDivImagens.offsetTop;

    document.onmousemove = this.moveDrag.bind(this);
    document.onmouseup = this.finalDeDrag.bind(this);
  }

  moveDrag(event) {
    // console.log('Posicao Elemento Anterior: ', this.elPOriginalX, this.elPOriginalY);

    this.elPOriginalX = event.movementX + this.elPOriginalX;
    this.elPOriginalY = event.movementY + this.elPOriginalY;
    // console.log('movimento do mouse: ', event.movementX, event.movementY);
    // console.log('Posicao Elemento: ', this.elPOriginalX, this.elPOriginalY);

    this.htmlDivImagens.style.left = this.elPOriginalX + "px";
    this.htmlDivImagens.style.top = this.elPOriginalY + "px";
  }

  finalDeDrag(event) {
    document.onmousemove = null;
    document.onmouseup = null;
  }

  wheel(event) {
    event.preventDefault();
    const meioApresentacaoX = this.htmlDivWrapper.clientWidth / 2;
    const meioApresentacaoY = this.htmlDivWrapper.clientHeight / 2;
    this.translateX += meioApresentacaoX - this.mouseX;
    this.translateY += meioApresentacaoY - this.mouseY;

    if (event.wheelDelta > 0) {
      this.zoom(this.valorZoomPadrao, 'soma');
    } else {
      this.zoom(this.valorZoomPadrao, 'subtracao');
    }
  }

  recenter() {
    this.htmlDivImagens.style.left = 'auto';
    this.htmlDivImagens.style.top = 'auto';
  }

  get xZoom() {
    return `${this.scaleCss.toPrecision(2)}X`;
  }

  zoom(valor, operador) {
    if (this.scaleCss > 1.5) {
      valor = valor * 2;
      // console.log('multiplicador');
    }
    if (operador === 'soma') {
      const scaleCss = this.scaleCss + valor;
      this.scaleCss = scaleCss < 3 ? scaleCss : 3;
    } else if (operador === 'subtracao') {
      const scaleCss = this.scaleCss - valor;
      this.scaleCss = scaleCss > 0 ? scaleCss : 0.005;
    }
    this.htmlDivImagens.style.transform = `scale(${this.scaleCss}, ${this.scaleCss})`;
  }
}
