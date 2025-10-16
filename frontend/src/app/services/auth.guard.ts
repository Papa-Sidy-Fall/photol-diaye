import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Get the current user value directly from the BehaviorSubject
  const currentUser = authService.getCurrentUser();

  if (currentUser) {
    // check if route is restricted by role
    if (route.data['roles'] && !route.data['roles'].includes(currentUser.role)) {
      // role not authorised so redirect to home page
      router.navigate(['/']);
      return false;
    }

    // authorised so return true
    return true;
  }

  // not logged in so redirect to login page with the return url
  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
