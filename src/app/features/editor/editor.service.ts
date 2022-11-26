import { Injectable } from '@angular/core';
import { imagenseditorMock } from './mock-imagens-editor';
import { posicoesMatrizMock } from '../apresentacao/mock-imagens-apresentacao';
import { ImagemModel } from '../../shared/imagem/imagem.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class EditorService {

  private readonly url = 'http://localhost:3000/v1/imagens/';
  objectDragged: ImagemModel;

  constructor(
    private http: HttpClient
  ) {
  }

  getImagens(id): Observable<ImagemModel[]> {
    const _url = `${this.url}${id}`;
    // return imagenseditorMock;
    return this.http.get(_url).pipe(map(data => data as ImagemModel[]));
  }
  
  getMatriz(): ImagemModel[] {
    return posicoesMatrizMock;
  }

  uploadImagens(id, body): Observable<ImagemModel> {
    const _url = `${this.url}${id}`;
    return this.http.post(_url, body).pipe(map((data: any) => data.objeto as ImagemModel));
  }

  deletarImagemPorId(id, idImagem): Observable<any> {
    const _url = `${this.url}${id}/${idImagem}`;
    return this.http.delete(_url).pipe(map((data: any) => data));
  }

}
