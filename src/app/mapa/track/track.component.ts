import { Component, OnInit, ViewChild } from '@angular/core';
import { RotaService } from '../services';
import { NguiMap, NguiMapComponent } from '@ngui/map';
import { Track, Polyline } from '../../model';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

 
  tracksDirceu : Track[] = [];
  tracksEverton: Track[] = [];
  tracksEli : Track[] = [];
  tracksDirceuInicio: Track[] = [];
  tracksHilario: Track[] = [];
  tracksLuiz: Track[] = [];

  polylines : Polyline [] = [];

  path = [
    {lat: 37.772, lng: -122.214},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027}
  ];

  constructor(private _rotaService: RotaService) { }

  ngOnInit() {

    this._rotaService.trackLuiz().subscribe(tracksLuiz =>{
      this.tracksLuiz = tracksLuiz;
    });

    this._rotaService.getTraksDirceu().subscribe(trackDirceu =>{
      this.tracksDirceu = trackDirceu;
    });

    this._rotaService.getTraksEverton().subscribe(trackEverton =>{
      this.tracksEverton = trackEverton;
    });

    this._rotaService.trackHilario().subscribe(tracksHilario =>{
      this.tracksHilario = tracksHilario;
    });

    this._rotaService.trackDirceuInicio().subscribe(tracksDirceuInicio =>{
      this.tracksDirceuInicio = tracksDirceuInicio;
    });


    this._rotaService.trackEli().subscribe(tracksEli =>{
      this.tracksEli = tracksEli;
    });

   /* this._rotaService.getTraks().subscribe( polis =>{
      //this.tracks = traks;
      this.polylines = polis;
      for(let p of this.polylines){
        console.log('tam ..', p.tracks.length);
        if(p.id === 1){
          console.log('p.id = 1');
          
        }
      }
      console.log(this.tracksDirceu);
      console.log(this.polylines);
      
      //this.ngUiMap.
    });*/
  }

}
