import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRotaComponent } from './listar-rota.component';

describe('ListarRotaComponent', () => {
  let component: ListarRotaComponent;
  let fixture: ComponentFixture<ListarRotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarRotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
