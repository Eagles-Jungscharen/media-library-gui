import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaItemUploadComponent } from './media-item-upload.component';

describe('MediaItemUploadComponent', () => {
  let component: MediaItemUploadComponent;
  let fixture: ComponentFixture<MediaItemUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaItemUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
