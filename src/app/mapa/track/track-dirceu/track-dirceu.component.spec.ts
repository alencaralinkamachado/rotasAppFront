import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDirceuComponent } from './track-dirceu.component';

describe('TrackDirceuComponent', () => {
  let component: TrackDirceuComponent;
  let fixture: ComponentFixture<TrackDirceuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackDirceuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackDirceuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
