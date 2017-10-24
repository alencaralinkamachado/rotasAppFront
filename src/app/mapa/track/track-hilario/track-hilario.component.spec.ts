import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackHilarioComponent } from './track-hilario.component';

describe('TrackHilarioComponent', () => {
  let component: TrackHilarioComponent;
  let fixture: ComponentFixture<TrackHilarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackHilarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackHilarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
