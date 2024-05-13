import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

//No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const canActivateGuardAuth: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkAuthStatus();
};

export const canMatchGuardAuth: CanMatchFn = ( //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {

  return checkAuthStatus();
};

const checkAuthStatus = (): boolean | Observable<boolean> => {
  //Se inyectan los servicios
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthenticationStatus()
  .pipe(
    tap( isAuthenticated => {
      if(isAuthenticated) router.navigate(['/'])
    }),
  map( isAuthenticated => !isAuthenticated )
  );
  }

// const checkAuthStatus = (): boolean | Observable<boolean> => {
//   //se inyectan el AuthService y el Router
//   const authService: AuthService = inject(AuthService);
//   const router: Router = inject(Router);

//   return authService.checkAuthentication().pipe(
//     tap((isAuthenticated) => {
//       if (!isAuthenticated) {
//         router.navigate(['/auth/login']);
//       }
//     })
//   );
// };
