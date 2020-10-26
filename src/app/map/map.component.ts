import { Component, OnInit } from '@angular/core';
import {UserListService} from '../user-list/user-list.service';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import {Fill, Stroke, Circle, Style} from 'ol/style';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {User} from '../user-list/user';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;
  private usersList: Array<User> = [];
  public points: Array<Feature> = [];

  constructor(
    public userListService: UserListService
  ) {}

  ngOnInit(): void {
    const pointStyle = new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({color: 'darkblue'}),
        stroke: new Stroke({
          color: 'white', width: 2
        })
      })
    })
    this.usersList = this.userListService.usersList;
    this.usersList.forEach(user => {
      this.points.push(new Feature({
        geometry: new Point(olProj.fromLonLat([user.latitude, user.longitude]))
      }));
    });
    this.map = new Map({
      target: 'users_map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([19.1343786, 51.9189046]),
        zoom: 6.5
      })
    });
    const layer = new VectorLayer({
      source: new VectorSource({
        features: this.points
      }),
      style: pointStyle
    });
    this.map.addLayer(layer);



  }

}
