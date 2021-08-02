import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Dragon } from '../../interface/dragons.interface';
import { DragonsService } from '../../services/dragons.service';
import { PageRoutes } from 'src/app/enum/page-routes.enum';

@Component({
  selector: 'app-dragon-details',
  templateUrl: './dragon-details.component.html',
  styleUrls: ['./dragon-details.component.scss']
})
export class DragonDetailsComponent implements OnInit {

  dragonDetails!: Dragon;
  dragonId!: string;

  constructor(
    private readonly dragonsService: DragonsService,
    private readonly router: Router,
    private readonly location: Location,
  ) { 

    const state = this.router.getCurrentNavigation()?.extras.state;

    if(state) {
      const id = state.id;
      this.detailsList(id);
    }

  }

  ngOnInit(): void {
    
  }

  /**
   * List of dragons
   * @param id dragon index
   */
   detailsList(id: string) {
    this.dragonsService.getDragonDetails(id).subscribe(
      resp => {
        this.dragonDetails = resp;
      },
      error => {
        this.router.navigate([PageRoutes.EMPTY_STATE], { state: { data: error } });
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
