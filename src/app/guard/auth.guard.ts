import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";


export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AuthenticationService);
  const router = inject(Router);
  if (!loginService.IsLoggedIn){
    return router.createUrlTree(['/newlogin']);
  }else {
    return true
  }
};


