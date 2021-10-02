import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private http: HttpClient) { }

  //define func to get shape
  getStateShapes() {
    return this.http.get('/src/assets/data/gz_2010_us_040_00_5m.json');
  }
}
