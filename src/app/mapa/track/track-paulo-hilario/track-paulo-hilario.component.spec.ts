import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackPauloHilarioComponent } from './track-paulo-hilario.component';

describe('TrackPauloHilarioComponent', () => {
  let component: TrackPauloHilarioComponent;
  let fixture: ComponentFixture<TrackPauloHilarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackPauloHilarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackPauloHilarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
