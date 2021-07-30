import { Component, OnInit } from '@angular/core';
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

  dragonsList!: Dragon[];
  dragonDetails!: Dragon;

  constructor(private readonly dragonsService: DragonsService) { }

  ngOnInit(): void {
    this.listDragons();
    this.detailsList('1');
  }

  /**
   * List of dragons
   */
  listDragons() {
    this.dragonsService.listDragons().subscribe(
      resp => {
        this.dragonsList = resp;
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
      }
    )
  }

  /**
   * Create a new dragon
   * @param dragon 
  */
  createDragon(dragon: Dragon) {

    delete dragon.id;

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
  editDragon(id: string, infoEdited: any) {
    this.dragonsService.editDragon(id, infoEdited).subscribe(
      resp => {
        console.log('>> EDITADO', resp);
      }
    )
  }

  deleteDragon(id:string) {
    this.dragonsService.deleteDragon(id).subscribe(
      resp => {
        console.log('>>>> DELETE', resp);
      },
      error => {
        console.log('>>> ERRO', error );
        console.log('>>> MENSAGENS', error.status, error.statusText)
      }
    )
  }

}
