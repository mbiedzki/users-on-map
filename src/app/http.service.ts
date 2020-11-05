import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = 'https://capap.gugik.gov.pl/api/fts/hier/pkt/qq';
  private urlVoivodeship = 'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/woj?cnt=50&o=0&dt=false';
  private urlDistrict = 'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/pow?cnt=50&o=0&dt=false';
  private urlCommunity = 'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/gmi?cnt=50&o=0&dt=false';
  private urlTown = 'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/msc?cnt=50&o=0&dt=false';
  private urlStreet = 'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/ulc?cnt=50&o=0&dt=false';
  private urlZip = 'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/kod?cnt=50&o=0&dt=false';
  private urlNumber = 'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/nr?cnt=50&o=0&dt=false';
  private headers = {'Content-Type': 'application/json'};

  async getCoords(body): Promise<any> {
    return this.http.post<any>(this.url, body, {headers: this.headers}).toPromise();
  }
  async getVoivodeships(body): Promise<any> {
    return this.http.post<any>(this.urlVoivodeship, body, {headers: this.headers}).toPromise();
  }
  async getDistricts(body): Promise<any> {
    return this.http.post<any>(this.urlDistrict, body, {headers: this.headers}).toPromise();
  }
  async getCommunities(body): Promise<any> {
    return this.http.post<any>(this.urlCommunity, body, {headers: this.headers}).toPromise();
  }
  async getTowns(body): Promise<any> {
    return this.http.post<any>(this.urlTown, body, {headers: this.headers}).toPromise();
  }
  async getStreets(body): Promise<any> {
    return this.http.post<any>(this.urlStreet, body, {headers: this.headers}).toPromise();
  }
  async getZips(body): Promise<any> {
    return this.http.post<any>(this.urlZip, body, {headers: this.headers}).toPromise();
  }
  async getNumbers(body): Promise<any> {
    return this.http.post<any>(this.urlNumber, body, {headers: this.headers}).toPromise();
  }

  constructor(
    private http: HttpClient,
  ) { }
}

