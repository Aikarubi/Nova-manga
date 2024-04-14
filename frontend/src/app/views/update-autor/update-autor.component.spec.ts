import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAutorComponent } from './update-autor.component';

describe('UpdateAutorComponent', () => {
  let component: UpdateAutorComponent;
  let fixture: ComponentFixture<UpdateAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
