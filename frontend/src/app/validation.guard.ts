import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const validationGuard: CanActivateFn = (route, state) => {
return false;
};
