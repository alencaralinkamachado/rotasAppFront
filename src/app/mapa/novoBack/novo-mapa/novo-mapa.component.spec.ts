import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoMapaComponent } from './novo-mapa.component';

describe('NovoMapaComponent', () => {
  let component: NovoMapaComponent;
  let fixture: ComponentFixture<NovoMapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoMapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
