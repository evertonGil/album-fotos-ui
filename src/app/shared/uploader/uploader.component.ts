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

  @ViewChild('uploaderInput', {static: false}) uploaderInput: ElementRef<any>;

  ngOnInit() {
  }

  chamarUploader() {
    const uploaderInput: HTMLInputElement = this.uploaderInput.nativeElement;
    // console.log(uploaderInput);
    uploaderInput.click();
  }

  anexarArquivos(event: InputEvent) {

    const arquivos = (event.target as HTMLInputElement).files;
    this.listaArquivos = [];

    if(arquivos != null){
      for ( let i = 0; arquivos.length; i++) {
        const arquivo = arquivos[i];
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

}
