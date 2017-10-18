import { Track } from '../model/track.model';

export class Polyline{
    constructor(public id?: number, public nome?: string, public tracks?: Track[]){}
}