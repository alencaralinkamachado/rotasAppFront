import { Component, OnInit } from '@angular/core';
import { Track, Polyline } from '../../../model';
import { RotaService } from '../../services';

@Component({
  selector: 'app-track-luiz',
  templateUrl: './track-luiz.component.html',
  styleUrls: ['./track-luiz.component.css']
})
export class TrackLuizComponent implements OnInit {
  tracksLuiz: Track[] = [];

  constructor(private _rotaService: RotaService) { }

  ngOnInit() {

    this._rotaService.trackLuiz().subscribe(tracksLuiz =>{
      this.tracksLuiz = tracksLuiz;
    });

  }

}
