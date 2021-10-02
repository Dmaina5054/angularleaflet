import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';
import { ShapeService } from '../shape.service';

//globals
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private states:any;
  private map:any;

  //load the shapefiles
  private initStatesLayer(){
    const stateLayer = L.geoJSON(this.states, {
      //config options
      style: (feature) =>({
        weight:3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.8,
        fillColor: '#6DB65B'
      })
    });

    //add to map
    this.map.addLayer(stateLayer);
  }



    //this function will implement map init
  private initMap(): void {
    this.map = L.map('map',{
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    //setting tiles layer here
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      //some options
      maxZoom: 20,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

    });

    //lets set to map now
    tiles.addTo(this.map);
  }



  constructor(private markerService:MarkerService, private shapeService: ShapeService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
    //this.markerService.makeCapitalMarkers(this.map)
    //will allow to draw map
    this.markerService.makeCapitalCirleMarker(this.map);
    //load state shape data

    this.shapeService.getStateShapes().subscribe(states => {
      this.states = states;
      this.initStatesLayer()
    });

  }




}
