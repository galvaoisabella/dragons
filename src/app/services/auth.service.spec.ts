import { HttpClientModule } from '@angular/common/http';
import { componentFactoryName } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        RouterTestingModule,
        HttpClientModule,
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call auth', () => {
    service.authUser({ address: '123', pass: '123'});
    expect(service.userValidated).toEqual(true);
  });
  
  it('should call auth', () => {
    service.userValidated = true;
    service.isUserAuth();
  });
});
