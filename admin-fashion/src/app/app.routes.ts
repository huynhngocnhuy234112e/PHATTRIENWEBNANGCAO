import { Routes } from '@angular/router';
import { FashionListComponent } from './components/fashion-list/fashion-list.component';
import { FashionFormComponent } from './components/fashion-form/fashion-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: FashionListComponent },
    { path: 'form', component: FashionFormComponent },
    { path: 'form/:id', component: FashionFormComponent },
];
