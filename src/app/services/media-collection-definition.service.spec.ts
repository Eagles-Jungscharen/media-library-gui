import { TestBed } from '@angular/core/testing';

import { MediaCollectionDefinitionService } from './media-collection-definition.service';

describe('MediaCollectionDefinitionService', () => {
  let service: MediaCollectionDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaCollectionDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
