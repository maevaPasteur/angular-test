import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

    constructor(private http: HttpClient) { }

    getData() {
        return this.http.get('https://data.ratp.fr/api/records/1.0/search/?dataset=liste-des-commerces-de-proximite-agrees-ratp&rows=10&start=1&sort=code_postal&facet=tco_libelle&facet=code_postal&facet=ville');
    }

    getValues(url) {
        return this.http.get(url);
    }


}
