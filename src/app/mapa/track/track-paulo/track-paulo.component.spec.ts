import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackPauloComponent } from './track-paulo.component';

describe('TrackPauloComponent', () => {
  let component: TrackPauloComponent;
  let fixture: ComponentFixture<TrackPauloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackPauloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackPauloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
