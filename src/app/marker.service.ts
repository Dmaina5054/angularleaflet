import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PopupService } from './popup.service';


@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson';


  constructor(private http:HttpClient, private popupService:PopupService) { }

  //create a scaled radius
  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val/maxVal); //like a scale of 1:20 for largest pop
  }

  //method will load the geojson data
  // and create markers
  makeCapitalMarkers(map:L.Map): void {
    this.http.get(this.capitals).subscribe(
      (res:any)=> {
        for(const c of res.features ){
          const lon = c.geometry.coordinates[0];
          const lat = c.geometry.coordinates[1];
          const marker = L.marker([lat,lon]);

          //add marker to map
          marker.addTo(map);

        }

      }
    )

  }

  //create a function to show circle marker
  //scale size to reflect population
  makeCapitalCirleMarker(map: L.Map): void{
    this.http.get(this.capitals).subscribe((res: any)=>{
      const maxPop = Math.max(...res.features.map( (x:any) => x.properties.population),0); // spread-operator and map

      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const circle = L.circleMarker([lat,lon], { radius: MarkerService.scaledRadius(c.properties.population,maxPop)});

        //add popup functionality
        circle.bindPopup(this.popupService.createCapitalPopup(c.properties));
        // circle.on('mouseover', function(e){
        //   //openpopup
        //   var popup = L.popup()
        //   .setLatLng(c.geometry.coordinates)
        //   .setContent(c.properties.population)
        //   .openOn(map)
        // });

        circle.addTo(map);


      }
    });

  }
}
