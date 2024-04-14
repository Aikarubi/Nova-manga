import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEditorialComponent } from './update-editorial.component';

describe('UpdateEditorialComponent', () => {
  let component: UpdateEditorialComponent;
  let fixture: ComponentFixture<UpdateEditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEditorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
