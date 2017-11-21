import { Component, OnInit } from '@angular/core';
import { Track, Polyline } from '../../../model';
import { RotaService } from '../../services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tracks-tcx',
  templateUrl: './tracks-tcx.component.html',
  styleUrls: ['./tracks-tcx.component.css']
})
export class TracksTcxComponent implements OnInit {

  busy: Subscription;
  //tracksDirceu : Track[] = [];
  polyline : Polyline;
  tracks : Track[] = [];
  entregas : Track[] = [];

  constructor(private _rotaService: RotaService) { }

  ngOnInit() {
    this.busy = this._rotaService.tracktcx().subscribe(poly =>{
      this.polyline = poly;
    
    console.log(this.polyline);
    console.log('tranks.........')
      this.tracks = this.polyline.tracks;
      console.log(this.tracks)

      this.entregas = this.polyline.pontosEntrega;
      console.log('entregas ...');
      //console.log(this.entregas)
     /* for(let i = 0; i < this.polyline.tracks.length; i++){
          console.log(this.polyline.tracks[i]);
      }*/

     

      
      
      //console.log(this.polyline.tracks);
    });
  }

}
