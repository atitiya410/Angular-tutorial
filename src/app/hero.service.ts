import { Injectable } from '@angular/core';
import { Hero } from './heroes';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map , tap} from 'rxjs/operators';


@Injectable() //file service only call API 
export class HeroService {

  private heroesUrl = 'http://localhost:50529/api/Heroes'; //URL to web api
  constructor(
    private http: HttpClient
  ) { }
  getHeroes(): Observable<Hero[]> {
    return this.http.get<any[]>(this.heroesUrl)  //get,put,del
  }

   getHero(id: number): Observable<Hero> {
      const url = this.heroesUrl + '/' + id;
      return this.http.get<Hero>(url)
      .pipe(
        tap(() => console.log('Fetch hero id = ' + id)),
        catchError(this.handleError<Hero>('getHero id = ' + id))
        );
      }

      private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
        console.error(error);
        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);
        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
        }

       /** PUT: update the hero on the server */
updateHero (hero: Hero): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  return this.http.put(this.heroesUrl+'/'+hero.id, hero, httpOptions)
  }

  /** POST: add a new hero to the server */
addHero (hero: Hero): Observable<Hero> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions);
}

/** DELETE: delete the hero from the server */
deleteHero (hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  return this.http.delete<Hero>(url, httpOptions);
}


}
