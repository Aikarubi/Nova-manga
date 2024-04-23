import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const validationGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const validateCode: number = 12345;
  const isValid = validateCode;
  
  if (isValid) {
    return true;
  } else {
    router.navigate(['/validacion']);
    return false;
  }
};
