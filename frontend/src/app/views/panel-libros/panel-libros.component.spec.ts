import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelLibrosComponent } from './panel-libros.component';

describe('PanelLibrosComponent', () => {
  let component: PanelLibrosComponent;
  let fixture: ComponentFixture<PanelLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelLibrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
