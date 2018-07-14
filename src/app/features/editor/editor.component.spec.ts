import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { editorComponent } from './editor.component';

describe('editorComponent', () => {
  let component: editorComponent;
  let fixture: ComponentFixture<editorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ editorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(editorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
