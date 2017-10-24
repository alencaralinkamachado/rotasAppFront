import { Component, OnInit } from '@angular/core';
import { Track, Polyline } from '../../../model';
import { RotaService } from '../../services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-track-hilario',
  templateUrl: './track-hilario.component.html',
  styleUrls: ['./track-hilario.component.css']
})
export class TrackHilarioComponent implements OnInit {

  busy: Subscription;
  tracksHilario : Track[] = [];
  constructor(private _rotaService: RotaService) { }

  ngOnInit() {
   this.busy = this._rotaService.trackHilario().subscribe(tracksHilario =>{
      this.tracksHilario = tracksHilario;
    });
  }

}
