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
import { PanelLibrosComponent } from './views/panel-libros/panel-libros.component';
import { PanelAutoresComponent } from './views/panel-autores/panel-autores.component';
import { PanelEditorialesComponent } from './views/panel-editoriales/panel-editoriales.component';
import { AddLibroComponent } from './views/add-libro/add-libro.component';
import { UpdateLibroComponent } from './views/update-libro/update-libro.component';
import { AddAutorComponent } from './views/add-autor/add-autor.component';
import { UpdateAutorComponent } from './views/update-autor/update-autor.component';
import { AddEditorialComponent } from './views/add-editorial/add-editorial.component';
import { UpdateEditorialComponent } from './views/update-editorial/update-editorial.component';

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
            { path: 'panel-libros', component: PanelLibrosComponent },
            { path: 'panel-autores', component: PanelAutoresComponent },
            { path: 'panel-editoriales', component: PanelEditorialesComponent },
            { path: 'add-libro', component: AddLibroComponent },
            { path: 'update-libro/:isbn', component: UpdateLibroComponent},
            { path: 'add-autor', component: AddAutorComponent},
            { path: 'update-autor/:id', component: UpdateAutorComponent},
            { path: 'add-editorial', component: AddEditorialComponent},
            { path: 'update-editorial/:id', component: UpdateEditorialComponent}
        ]
    }

];
