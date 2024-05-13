import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Hero } from '../interfaces/hero.interfaces';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class heroesService {

  private baseURL: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseURL}/heroes`);
  }

  getHeroById(id:string): Observable<Hero|undefined>{
    return this.http.get<Hero>(`${this.baseURL}/heroes/${id}`)
    .pipe(
      catchError(
        error => of(undefined))
      );
  }

  getSuggestions(query:string): Observable<Hero[]>{
    const url:string = `${this.baseURL}/heroes?q=${query}&_limit=6`;
    return this.http.get<Hero[]>(url);
  }

  addHero(hero: Hero): Observable<Hero>{
    if(!hero) throw Error('Hero property is required for post request.');
    return this.http.post<Hero>(`${this.baseURL}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero>{
    if(!hero) throw Error('Hero id is required.');
    return this.http.patch<Hero>(`${this.baseURL}/heroes/${hero.id}`, hero);
  }

  deleteHeroById(id:string):Observable<boolean> {
    return this.http.delete(`${this.baseURL}/heroes/${id}`)
    .pipe(
      map( resp=> true),
      catchError(err => of(false)),
    );
  }

}
