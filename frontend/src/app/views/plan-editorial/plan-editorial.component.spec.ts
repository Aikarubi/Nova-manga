import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEditorialComponent } from './plan-editorial.component';

describe('PlanEditorialComponent', () => {
  let component: PlanEditorialComponent;
  let fixture: ComponentFixture<PlanEditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanEditorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
