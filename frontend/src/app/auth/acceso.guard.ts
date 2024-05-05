/*import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BibliotecaService } from '../services/biblioteca/biblioteca.service';

export const accesoGuard: CanActivateFn = (route, state) => {
  //return true;

  const router = inject(Router);
  const clave = route.params['clave'];
  const accesoValido = inject(BibliotecaService).verificarAcceso(clave) ;



  if (accesoValido) {
    return true;
console.log( 'Acceso correcto!' );
  } else {
    
    router.navigate(['/validacion']);
    return false;
    console.log( 'Acceso correcto!' );
  }

};*/
