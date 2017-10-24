import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackEliComponent } from './track-eli.component';

describe('TrackEliComponent', () => {
  let component: TrackEliComponent;
  let fixture: ComponentFixture<TrackEliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackEliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackEliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
