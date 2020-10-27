import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import Feature from 'ol/Feature';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = 'https://capap.gugik.gov.pl/api/fts/hier/pkt/qq';
  private headers = {'Content-Type': 'application/json'};
  async getCoords(body): Promise<any> {
    return this.http.post<any>(this.url, body, {headers: this.headers}).toPromise();
  }

  constructor(
    private http: HttpClient,
  ) { }
}

