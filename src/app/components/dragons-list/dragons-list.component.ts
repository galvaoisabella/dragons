import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import { PageRoutes } from 'src/app/enum/page-routes.enum';
import { Dragon } from 'src/app/interface/dragons.interface';
import { ErrorResp } from 'src/app/interface/error-resp.interface';
import { DragonsService } from 'src/app/services/dragons.service';

moment.locale('pt-br');

@Component({
  selector: 'app-dragons-list',
  templateUrl: './dragons-list.component.html',
  styleUrls: ['./dragons-list.component.scss']
})
export class DragonsListComponent implements OnInit {

  edit: boolean = false;
  dragonForm!: FormGroup;
  dragonsList!: Dragon[];

  constructor(
    private readonly dragonsService: DragonsService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.listDragons();
    this.createFormDragon();
  }

  /**
   * Create a dragon form
   */
  createFormDragon() {
    this.dragonForm = this.formBuilder.group({
      createdAt: '',
      name: '',
      type: '',
      histories: '',
    })
  }

  /**
   * List of dragons
   */
  listDragons() {
    this.dragonsService.listDragons().subscribe(
      resp => {
        this.dragonsList = resp;

        this.dragonsList.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
      },
      () => {
        this.router.navigate([PageRoutes.EMPTY_STATE]);
      }
    )
  }

  /**
 * Edit a dragon
 * @param id dragon index
 * @param dragon 
 */
  editDragon(dragon: Dragon, infoEdited: any) {
    dragon = {
      id: dragon.id,
      createdAt: moment().format(),
      name: infoEdited.name ? infoEdited.name : dragon.name,
      histories: infoEdited.histories ? infoEdited.histories : dragon.histories,
      type: infoEdited.type ? infoEdited.type : dragon.type
    }
    this.dragonsService.editDragon(dragon.id, dragon).subscribe(
      () => {
        this.ngOnInit();
      },
      () => {
        this.router.navigate([PageRoutes.EMPTY_STATE]);
      }
    )
  }

  /**
   * Delete a dragon
   * @param id dragon index
   */
  deleteDragon(id: string) {
    this.dragonsService.deleteDragon(id).subscribe(
      () => {
        this.ngOnInit();
      },
      () => {
        this.router.navigate([PageRoutes.EMPTY_STATE]);
      }
    )
  }

/**
 * Redirect to details page
 * @param id index of dragon
 */
  redirectToDetails(id: string) {
    this.router.navigate([PageRoutes.DRAGON_DETAILS], { state: { id: id }});
  }

  /**
 * Redirect to register page
 * @param id index of dragon
 */
   redirectToRegister() {
    this.router.navigate([PageRoutes.REGISTER_DRAGON]);
  }

}

