import { Component, OnInit } from '@angular/core';
import { Track, Polyline } from '../../../model';
import { RotaService } from '../../services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-track-dirceu',
  templateUrl: './track-dirceu.component.html',
  styleUrls: ['./track-dirceu.component.css']
})
export class TrackDirceuComponent implements OnInit {

  busy: Subscription;

  constructor(private _rotaService: RotaService) { }

  tracksDirceuInicio: Track[] = [];


  ngOnInit() {

    this.busy = this._rotaService.trackDirceuInicio().subscribe(tracksDirceuInicio =>{
      this.tracksDirceuInicio = tracksDirceuInicio;
    });

  }

}
