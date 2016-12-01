import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Hero } from './hero';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService{
    private _url = "app/heroes";
    private _headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private _http: Http){}

    getHeroes(): Promise<Hero[]>{
        return this._http.get(this._url)
                    .toPromise()
                    .then(
                        heroes => heroes.json().data as Hero[])
                        .catch(err => Promise.reject(err));
    }

    getHero(id: number) : Promise<Hero> {
    			  return this.getHeroes()
               .then(heroes => heroes.find(hero => hero.id === id));
  	} 

    update(hero : Hero) : Promise<Hero>{
          const url = `${this._url}/${hero.id}`;
          return this._http.put(url, JSON.stringify(hero), this._headers)
                  .toPromise()
                  .then(() => hero)
                  .catch(err => Promise.reject(err));

    }
    add(name : string) : Promise<Hero> {
        return this._http.post(this._url,JSON.stringify({name: name}) , this._headers)
                    .toPromise()
                    .then(res => res.json().data)
                    .catch(err => Promise.reject(err));
    }

    delete(id : number) : Promise<Hero>{
          const url = `${this._url}/${id}`;
           return this._http.delete(url, this._headers)
                      .toPromise()
                      .then(() => null)
                      .catch(err => Promise.reject(err));
    } 

}