import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksTcxComponent } from './tracks-tcx.component';

describe('TracksTcxComponent', () => {
  let component: TracksTcxComponent;
  let fixture: ComponentFixture<TracksTcxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracksTcxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksTcxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
