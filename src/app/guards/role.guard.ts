import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';


export const roleGuard: CanActivateFn = (route, state) => {
  const Auht = inject(AuthserviceService)
  const router = inject(Router);
  const isLog = Auht.isLoggedIn();
  const alloedroles = route.data['roles'] as string[];
  const roleuser = Auht.getRole();

  if (!isLog && !roleuser) {
    // Επέτρεψε είσοδο στους μη συνδεδεμένους
    return true;
  }

  if (isLog && roleuser && alloedroles.includes(roleuser)) {
    return true;
  }
  

  router.navigate(['/login']);
  return false;
};
