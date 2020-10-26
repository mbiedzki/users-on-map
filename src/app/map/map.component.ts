import {Component, OnInit} from '@angular/core';
import {UserListService} from '../user-list/user-list.service';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import {Fill, Stroke, Circle, Style, Text} from 'ol/style';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {User} from '../user-list/user';
import {defaults as Defaults} from 'ol/control';
import {Control} from 'ol/control';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;
  private usersList: Array<User> = [];
  public points: Array<Feature> = [];

  pointStyle(feature: Feature): any {
    return new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({color: 'darkblue'}),
        stroke: new Stroke({
          color: 'white', width: 2
        })
      }),
      text: new Text({
        font: '12px Roboto',
        text: feature.get('label'),
        offsetY: -14,
        fill: new Fill({color: 'darkblue'}),
        backgroundFill: new Fill({color: 'white'})
      })
    });
  }

  constructor(
    public userListService: UserListService
  ) {
  }

  ngOnInit(): void {
    this.usersList = this.userListService.usersList;
    this.usersList.forEach(user => {
      this.points.push(new Feature({
        geometry: new Point(olProj.fromLonLat([user.latitude, user.longitude])),
        label: user.lastName + ' ' + user.firstName
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
      }),
      controls: new Defaults({
        attribution: false,
        rotate: false
      })
    });
    const layer = new VectorLayer({
      source: new VectorSource({
        features: this.points
      }),
      style: this.pointStyle
    });
    this.map.addLayer(layer);
  }
}
