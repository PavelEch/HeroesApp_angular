import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sidebarItems = [
    {label: 'Listado', icon: 'label', url: './list-hero'},
    {label: 'Añadir', icon: 'add', url: './new-hero'},
    {label: 'Buscar', icon: 'search', url: './search-hero'},
  ];

  constructor(
    private AuthService: AuthService,
    private Router:Router

  ){}

  get User():User | undefined{
    return this.AuthService.currentUser;
  }

  onLogout():void{
    this.AuthService.logout();
    this.Router.navigate(['/auth/login']);
  }

}
