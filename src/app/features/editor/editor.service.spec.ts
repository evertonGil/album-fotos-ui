import { TestBed, inject } from '@angular/core/testing';

import { editorService } from './editor.service';

describe('editorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [editorService]
    });
  });

  it('should be created', inject([editorService], (service: editorService) => {
    expect(service).toBeTruthy();
  }));
});
