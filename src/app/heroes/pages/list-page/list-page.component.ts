import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interfaces';
import { heroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {

  public heroes: Hero[] = [];

  constructor (private heroesService: heroesService){
  }
  ngOnInit(): void {
    this.heroesService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);


  }

}
