import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditorialComponent } from './add-editorial.component';

describe('AddEditorialComponent', () => {
  let component: AddEditorialComponent;
  let fixture: ComponentFixture<AddEditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
