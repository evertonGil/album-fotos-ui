import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  @Input() imagemObj;
  propList;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.propList = Object.keys(this.imagemObj);
  }

}
