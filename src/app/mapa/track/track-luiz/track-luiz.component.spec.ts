import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackLuizComponent } from './track-luiz.component';

describe('TrackLuizComponent', () => {
  let component: TrackLuizComponent;
  let fixture: ComponentFixture<TrackLuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackLuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackLuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
