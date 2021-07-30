import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragonsListComponent } from './components/dragons-list/dragons-list.component';
import { LoginComponent } from './components/login/login.component';
import { PageRoutes } from './enum/page-routes.enum';

const routes: Routes = [  
{ path: '', pathMatch:'full', redirectTo: PageRoutes.LOGIN },
{ path: PageRoutes.LOGIN, component: LoginComponent },
{ path: PageRoutes.DRAGONS_LIST, component: DragonsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
