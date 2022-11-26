import { Component, OnInit, OnDestroy } from '@angular/core';
import { PubSub } from '../pubsub';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  public showLoader;
  private pubSub = new PubSub();

  constructor() {
    this.pubSub.subscribe('SHOWLOADER', this.tootgleShow.bind(this));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.pubSub.unSubscribe('SHOWLOADER', this.tootgleShow.bind(this));
  }

  tootgleShow(show) {
    console.log('loader', this.showLoader);
    this.showLoader = show;
    console.log('loader', this.showLoader);
  }
}
