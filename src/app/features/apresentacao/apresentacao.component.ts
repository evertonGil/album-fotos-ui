import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.css']
})
export class ApresentacaoComponent implements OnInit {
  @Input() listaImagens;
  
  constructor() { }

  ngOnInit() {
  }

}
