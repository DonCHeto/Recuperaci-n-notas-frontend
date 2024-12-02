import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotaComponent } from './nota/nota.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
        title:'home'
    },
    {
        path:'nota',
        component:NotaComponent,
        title:'nota'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }
];
