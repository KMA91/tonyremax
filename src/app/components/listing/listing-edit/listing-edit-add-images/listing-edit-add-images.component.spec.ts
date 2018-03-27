import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingEditAddImagesComponent } from './listing-edit-add-images.component';

describe('ListingEditAddImagesComponent', () => {
  let component: ListingEditAddImagesComponent;
  let fixture: ComponentFixture<ListingEditAddImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingEditAddImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingEditAddImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
