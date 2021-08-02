import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DragonsService } from '../../services/dragons.service';
import { Dragon } from '../../interface/dragons.interface';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { PageRoutes } from 'src/app/enum/page-routes.enum';

moment.locale('pt-br');

@Component({
  selector: 'app-register-dragon',
  templateUrl: './register-dragon.component.html',
  styleUrls: ['./register-dragon.component.scss']
})
export class RegisterDragonComponent implements OnInit {

  dragonForm!: FormGroup;

  constructor(
    private readonly location: Location,
    private readonly formBuilder: FormBuilder,
    private readonly dragonsService: DragonsService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {

    this.createFormDragon();
  }

  /**
 * Create a dragon form
 */
  createFormDragon() {
    this.dragonForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      histories: ['', Validators.required],
    })
  }

  /**
   * Create a new dragon
   * @param dragon 
  */
  createDragon(dragon: Dragon) {

    dragon.createdAt = moment().format();

    this.dragonsService.createDragon(dragon).subscribe(
      () => {
        this.close();
      },
      () => {
        this.router.navigate([PageRoutes.EMPTY_STATE]);
      }
    )
  }

  /**
   * Back to list page
   */
  public close() {
    this.location.back();
  }
}
