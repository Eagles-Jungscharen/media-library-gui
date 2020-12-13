import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCollectionDefinitionComponent } from './media-collection-definition.component';

describe('MediaCollectionDefinitionComponent', () => {
  let component: MediaCollectionDefinitionComponent;
  let fixture: ComponentFixture<MediaCollectionDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaCollectionDefinitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCollectionDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
