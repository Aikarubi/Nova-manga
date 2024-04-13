import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLibroComponent } from './update-libro.component';

describe('UpdateLibroComponent', () => {
  let component: UpdateLibroComponent;
  let fixture: ComponentFixture<UpdateLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLibroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
