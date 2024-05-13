import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component'
import { AddHeroPageComponent } from './pages/add-hero-page/add-hero-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

const routes: Routes = [{
  path: '',
  component: LayoutPageComponent,
  children: [
    {
      path:'search-hero',
      component: SearchPageComponent
    },
    {
      path:'list-hero',
      component: ListPageComponent
    },
    {
      path:'new-hero',
      component: AddHeroPageComponent
    },
    {
      path:'edit/:id',
      component: AddHeroPageComponent
    },
    {
      path:':id',
      component: HeroPageComponent
    },
    {
      path:'**',
      redirectTo: 'list-hero'
    },
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
