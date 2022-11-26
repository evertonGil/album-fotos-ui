import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  @Output() changeArquivos = new EventEmitter();

  listaArquivos: any;

  constructor() { }

  @ViewChild('uploaderInput') uploaderInput: ElementRef;

  ngOnInit() {
  }

  chamarUploader() {
    const uploaderInput: HTMLInputElement = this.uploaderInput.nativeElement;
    // console.log(uploaderInput);
    uploaderInput.click();
  }

  anexarArquivos(event) {

    const arquivos = event.target.files;
    this.listaArquivos = [];

    for (const arquivo of arquivos) {
      const leitor = new FileReader();
      leitor.readAsDataURL(arquivo);
      leitor.onload = () => {

        const _arquivo = {
          nome: arquivo.name.split('.').slice(0, -1).join('.'),
          dataUrl: leitor.result,
          uploading: true
        }
        this.changeArquivos.emit(_arquivo);
      }
    }
  }

}
