import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragonDetailsComponent } from './components/dragon-details/dragon-details.component';
import { DragonsListComponent } from './components/dragons-list/dragons-list.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterDragonComponent } from './components/register-dragon/register-dragon.component';
import { PageRoutes } from './enum/page-routes.enum';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [  
{ path: '', pathMatch:'full', redirectTo: PageRoutes.LOGIN },
{ path: PageRoutes.LOGIN, component: LoginComponent },
{ path: PageRoutes.DRAGONS_LIST, component: DragonsListComponent, canActivate: [AuthGuard] },
{ path: PageRoutes.DRAGON_DETAILS, component: DragonDetailsComponent, canActivate: [AuthGuard] },
{ path: PageRoutes.REGISTER_DRAGON, component: RegisterDragonComponent, canActivate: [AuthGuard] },
{ path: PageRoutes.EMPTY_STATE, component: EmptyStateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
