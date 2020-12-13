import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaItemDefinitionComponentComponent } from './media-item-definition-component.component';

describe('MediaItemDefinitionComponentComponent', () => {
  let component: MediaItemDefinitionComponentComponent;
  let fixture: ComponentFixture<MediaItemDefinitionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaItemDefinitionComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemDefinitionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
