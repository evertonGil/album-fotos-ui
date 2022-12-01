import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MdcHelper } from '../../helpers/mdc.helper';
import { ImagemModel } from '../../shared/imagem/imagem.model';
import { EditorService } from './editor.service';
import { PubSub } from '../../shared/pubsub';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class editorComponent implements OnInit {

  pubSub: PubSub;
  urlPublica = 'http://localhost:3000';

  worker = new Worker('assets/distribuidor-worker.js');

  constructor(
    private readonly editorService: EditorService
  ) {
    this.pubSub = new PubSub();
  }

  imagensPreviewApi: ImagemModel[] = [];
  matrizApi: ImagemModel[];
  listaImagens: ImagemModel[] = [];

  @ViewChild('imagensPreview', {static: false}) imagensPreview: ElementRef;

  ngOnInit() {
    this.matrizApi = this.editorService.getMatriz();

    // trata imagens vindas do servidor para o editor/preview
    this.editorService.getImagens(1).subscribe(imagens => {
      if (imagens && imagens.length) {
        this.imagensPreviewApi = imagens;
      } else {
        this.imagensPreviewApi = [];
      }

      // this.imagensPreviewApi.forEach((imagem, i, arr) => {
      //   imagem.proporcao = this.formataProporcao(imagem.preview);
      // });
    });


    this.matrizApi.forEach((slot, i, arr) => {
      slot.proporcao = this.formataProporcao(slot);
    });

    this.listaImagens = ([] as any[]).concat(this.matrizApi);
  }

  formataProporcao(elemento) {
    const fracao = MdcHelper.reduzirFracao(elemento.largura, elemento.altura);
    const decimal = elemento.largura / elemento.altura;
    const orientacao = decimal > 1 ? 'P' : 'R';
    return {
      fracao: fracao,
      decimal: decimal,
      orientacao: orientacao
    };
  }

  shuffle() {
    this.pubSub.publish('SHOWLOADER', true);

    const slotsVazios = this.listaImagens.filter((item, i, arr) => {
      return !item.path;
    });

    const slotsParaPreencher = ([] as any[]).concat(slotsVazios);

    this.worker.onmessage = (resposta) => {
      this.listaImagens = resposta.data;
      this.pubSub.publish('SHOWLOADER', false);
    }

    this.worker.onerror = (error) => {
      console.log('[error]', error);
      this.pubSub.publish('SHOWLOADER', false);
    }

    this.imagensPreviewApi.forEach((imagem, i, arr) => {
      imagem.proporcao = this.formataProporcao(imagem.preview);
    });

    this.worker.postMessage({
      imagensPreviewApi: this.imagensPreviewApi,
      slotsParaPreencher: slotsParaPreencher,
      urlPublica: this.urlPublica,
      listaImagens: this.listaImagens
    })

  }

  SomaUsoImagemAPI(imagem: ImagemModel): any {
    const imagemApi = this.imagensPreviewApi[this.imagensPreviewApi.indexOf(imagem)];
    imagemApi.countUse = !imagemApi.countUse ? 0 + 1 : imagemApi.countUse + 1;
  }

  scrolHorizontal(event) {
    event.preventDefault();

    const div = this.imagensPreview.nativeElement as HTMLDivElement;
    div.scrollLeft += event.wheelDelta * -1;
  }
}
