import { Injectable } from '@angular/core';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userValidated: boolean = false;
  
  constructor() { }

  authUser(user: User) {
    this.userValidated = ((user.address === '123')  && (user.pass === '123'))
    return this.userValidated;
  }

  isUserAuth(){

    return this.userValidated;
  }
}
