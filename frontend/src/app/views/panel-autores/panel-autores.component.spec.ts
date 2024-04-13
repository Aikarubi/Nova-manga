import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAutoresComponent } from './panel-autores.component';

describe('PanelAutoresComponent', () => {
  let component: PanelAutoresComponent;
  let fixture: ComponentFixture<PanelAutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelAutoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelAutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
