import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEditorialesComponent } from './panel-editoriales.component';

describe('PanelEditorialesComponent', () => {
  let component: PanelEditorialesComponent;
  let fixture: ComponentFixture<PanelEditorialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelEditorialesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelEditorialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
