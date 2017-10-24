import { Component, OnInit } from '@angular/core';
import { Track, Polyline } from '../../../model';
import { RotaService } from '../../services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-track-paulo',
  templateUrl: './track-paulo.component.html',
  styleUrls: ['./track-paulo.component.css']
})
export class TrackPauloComponent implements OnInit {
  busy: Subscription;
  tracksDirceu : Track[] = [];

  constructor(private _rotaService: RotaService) { }

  ngOnInit() {
    this.busy = this._rotaService.getTraksDirceu().subscribe(trackDirceu =>{
      this.tracksDirceu = trackDirceu;
    });
  }

}
