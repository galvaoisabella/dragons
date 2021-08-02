import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragonsListComponent } from './components/dragons-list/dragons-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { DragonsService } from './services/dragons.service';
import { DragonDetailsComponent } from './components/dragon-details/dragon-details.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { RegisterDragonComponent } from './components/register-dragon/register-dragon.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DragonsListComponent,
    DragonDetailsComponent,
    EmptyStateComponent,
    RegisterDragonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
            AuthService,
            DragonsService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
