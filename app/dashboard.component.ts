import { Component } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
})

export class DashboardComponent{
	heroes :Hero[] ;
    getHeroes() : void{
       this.heroService.getHeroes()
       .then(heroes => this.heroes=heroes.slice(1,5));
    }

    ngOnInit(): void {
    this.getHeroes();
    }
    constructor(private heroService: HeroService) { }
}
