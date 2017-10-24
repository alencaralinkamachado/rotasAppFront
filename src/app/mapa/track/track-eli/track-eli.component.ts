import { Component, OnInit } from '@angular/core';
import { Track, Polyline } from '../../../model';
import { RotaService } from '../../services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-track-eli',
  templateUrl: './track-eli.component.html',
  styleUrls: ['./track-eli.component.css']
})
export class TrackEliComponent implements OnInit {
  busy: Subscription;
  tracksEli : Track[] = [];
  constructor(private _rotaService: RotaService) { }

  ngOnInit() {
  this.busy =  this._rotaService.trackEli().subscribe(tracksEli =>{
      this.tracksEli = tracksEli;
    });
  }

}
