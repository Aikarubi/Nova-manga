import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NovedadesComponent } from './views/novedades/novedades.component';
import { CatalogoComponent } from './views/catalogo/catalogo.component';
import { PlanEditorialComponent } from './views/plan-editorial/plan-editorial.component';
import { SobreNosotrosComponent } from './views/sobre-nosotros/sobre-nosotros.component';
import { PoliticaPrivacidadComponent } from './views/politica-privacidad/politica-privacidad.component';
import { DetalleComponent } from './views/detalle/detalle.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'novedades', component: NovedadesComponent},
    {path: 'catalogo', component: CatalogoComponent},
    {path: 'plan-editorial', component: PlanEditorialComponent},
    {path: 'sobre-nosotros', component: SobreNosotrosComponent},
    {path: 'politica-privacidad', component: PoliticaPrivacidadComponent},
    {path: 'detalle', component: DetalleComponent}
];
