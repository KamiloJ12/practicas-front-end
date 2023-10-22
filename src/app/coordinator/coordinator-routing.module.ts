import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CountriesPageComponent } from './pages/countries-page/countries-page.component';
import { DepartmentsPageComponent } from './pages/departments-page/departments-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
        { path: 'countries', component: CountriesPageComponent },
        { path: 'departments/:country', component: DepartmentsPageComponent },
        { path: '**', redirectTo: 'countries' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorRoutingModule { }