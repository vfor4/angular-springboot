import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class LowjShopFormService {

  constructor(private httpClient: HttpClient) { }

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }


  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear)
    }
    return of(data);

  }

  private countriesUrl = 'http://localhost:8080/api/countries';
  private stateUrl = 'http://localhost:8080/api/states/';

  getCountries(): Observable<Country[]> {
   
    return this.httpClient.get<getResponseCountry>(this.countriesUrl).pipe(
      map(data => data._embedded.countries)
    )
  }

  getStates(countryCode: string): Observable<State[]> {
    const stateUrl = `${this.stateUrl}search/findByCountryCode?code=${countryCode}`;
    return this.httpClient.get<getResponseState>(stateUrl).pipe(
      map(data => data._embedded.states)
    )
  }

}
interface getResponseCountry {
  _embedded: {
    countries: Country[]
  }
}

interface getResponseState {
  _embedded: {
    states: State[]
  }
}
