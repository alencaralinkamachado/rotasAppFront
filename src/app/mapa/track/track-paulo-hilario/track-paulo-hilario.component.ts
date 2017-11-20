import { Component, OnInit } from '@angular/core';
import { RotaService } from '../../services';
import {Subscription} from 'rxjs';
import { Track, Polyline } from '../../../model';

@Component({
  selector: 'app-track-paulo-hilario',
  templateUrl: './track-paulo-hilario.component.html',
  styleUrls: ['./track-paulo-hilario.component.css']
})
export class TrackPauloHilarioComponent implements OnInit {

  busy: Subscription;
  tracksDirceu : Track[] = [];
  tracksHilario : Track[] = [];
  
  constructor(private _rotaService: RotaService) { }

  ngOnInit() {
    this.busy = this._rotaService.getTraksDirceu().subscribe(trackDirceu =>{
      this.tracksDirceu = trackDirceu;
    });
    this.busy = this._rotaService.trackHilario().subscribe(tracksHilario =>{
      this.tracksHilario = tracksHilario;
    });
  }

}
