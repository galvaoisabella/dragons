import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interface/user.interface';
import { AuthService } from '../../services/auth.service';
import { PageRoutes } from '../../enum/page-routes.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  passType: string = 'password';
  passDisplayed: boolean = false;
  loginSuccess: boolean = true;
  user: User = {
    address: '',
    pass: ''
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  
  /**
   * Construção do formulário de login
   */
  private createForm() {
    this.formLogin = this.formBuilder.group({
      login: ['', Validators.required],
      pass: ['', Validators.required]
    })
  }

  /**
   * Controle de exibição de senha
   */
  public showPass() {
    this.passDisplayed = !this.passDisplayed;
    this.passType = this.passDisplayed ? 'text' : 'password';
  }

  /**
   * Autenticação usuário
   */
  private auth() {
    this.user.address = this.formLogin.value.login;
    this.user.pass = this.formLogin.value.pass;

    this.loginSuccess = this.authService.authUser(this.user);
  }

  /**
   * redirecionamento para tela de listagem de dragões
   */
  public signOn() {
    this.auth();
    if (this.loginSuccess) {
      this.router.navigate([PageRoutes.DRAGONS_LIST])
    }
  }

}
