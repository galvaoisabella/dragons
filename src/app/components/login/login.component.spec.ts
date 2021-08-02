import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PageRoutes } from 'src/app/enum/page-routes.enum';
import { AuthService } from 'src/app/services/auth.service';
import { DragonsListComponent } from '../dragons-list/dragons-list.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        LoginComponent,
        DragonsListComponent
      ],
      imports: [
        BrowserDynamicTestingModule,
        RouterTestingModule.withRoutes([{ path: PageRoutes.LOGIN, component: LoginComponent }]),
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth', () => {
    spyOn(authService, 'authUser').and.returnValue(true)
    component.signOn();
    component.showPass();

    expect(component.passType).toEqual('text');
  });
});
