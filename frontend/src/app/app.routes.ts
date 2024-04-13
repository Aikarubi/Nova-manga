import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NovedadesComponent } from './views/novedades/novedades.component';
import { CatalogoComponent } from './views/catalogo/catalogo.component';
import { SobreNosotrosComponent } from './views/sobre-nosotros/sobre-nosotros.component';
import { PoliticaPrivacidadComponent } from './views/politica-privacidad/politica-privacidad.component';
import { DetalleComponent } from './views/detalle/detalle.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { PanelLayoutComponent } from './layouts/panel-layout/panel-layout.component';
import { PanelComponent } from './views/panel/panel.component';

export const routes: Routes = [

    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'novedades', component: NovedadesComponent },
            { path: 'catalogo', component: CatalogoComponent },
            { path: 'sobre-nosotros', component: SobreNosotrosComponent },
            { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },
            { path: 'detalle', component: DetalleComponent }
        ]
    },
    {
        path: '',
        component: PanelLayoutComponent,
        children: [
            { path: 'panel', component: PanelComponent },
        ]
    }

];
