import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Dragon } from 'src/app/interface/dragons.interface';
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
  dragonDetails!: Dragon;

  constructor(
    private readonly dragonsService: DragonsService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.listDragons();
    this.detailsList('8');

    // const dragon: Dragon = {
    //   name: 'Morte Rubra',
    //   createdAt: moment().format(),
    //   type: "Brasa",
    //   histories: "Como treinar seu dragão"
    // }

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
        console.log('>>> lista', this.dragonsList)

        this.dragonsList.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });

      }
    )
  }

  /**
   * List of dragons
   * @param id dragon index
   */
  detailsList(id: string) {
    this.dragonsService.getDragonDetails(id).subscribe(
      resp => {
        this.dragonDetails = resp;
        console.log('>>> DETALJES', this.dragonDetails)
      }
    )
  }

  /**
   * Create a new dragon
   * @param dragon 
  */
  createDragon(dragon: Dragon) {

    //delete dragon.id;

    dragon.createdAt = moment().format();

    this.dragonsService.createDragon(dragon).subscribe(
      resp => {
        console.log('>>> DRAGAO CRIADO', resp)
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
      error => {
        console.log('>>> ERRO', error);
        console.log('>>> MENSAGENS', error.status, error.statusText)
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
      error => {
        console.log('>>> ERRO', error);
        console.log('>>> MENSAGENS', error.status, error.statusText)
      }
    )
  }


  redirectToDetails(id: string) {
    this.router.navigate(['']);
  }
}

