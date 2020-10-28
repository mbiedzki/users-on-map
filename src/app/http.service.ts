import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

