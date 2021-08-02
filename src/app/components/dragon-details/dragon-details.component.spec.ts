import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DragonsService } from '../../services/dragons.service';
import { Location } from '@angular/common';

import { DragonDetailsComponent } from './dragon-details.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PageRoutes } from 'src/app/enum/page-routes.enum';
import { EmptyStateComponent } from '../empty-state/empty-state.component';

const mockDetails = {
    "createdAt": "2021-08-01T20:38:45.788Z",
    "name": "Viserion",
    "type": "Fire",
    "histories": "Valar Dohaeris",
    "id": "14"
  };

describe('DragonDetailsComponent', () => {
  let component: DragonDetailsComponent;
  let fixture: ComponentFixture<DragonDetailsComponent>;
  let dragonsService: DragonsService;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DragonDetailsComponent,
        EmptyStateComponent,
      ],
      imports: [
        BrowserDynamicTestingModule,
        RouterTestingModule.withRoutes([
          { path: PageRoutes.DRAGON_DETAILS, component: DragonDetailsComponent },
          { path: PageRoutes.EMPTY_STATE, component: EmptyStateComponent },
        ]),
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonDetailsComponent);
    dragonsService = TestBed.inject(DragonsService);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close', () => {
    spyOn(location, 'back').and.callThrough();

    component.close();

    expect(location.back).toHaveBeenCalled();
  });

  it('should call dragonDetails', () => {      
    spyOn(dragonsService, 'getDragonDetails').and.returnValue(of(mockDetails));

    component.detailsList('14');
    fixture.detectChanges();

    expect(dragonsService.getDragonDetails).toHaveBeenCalled();
  });

  it('should callfake dragonDetails and return error', () => {    
    spyOn(router, 'navigate').and.callThrough();  
    spyOn(dragonsService, 'getDragonDetails').and.returnValue(throwError(new Error('')));

    component.detailsList('14');
    fixture.detectChanges();

    expect(dragonsService.getDragonDetails).toHaveBeenCalled();
    //expect(router.navigate).toHaveBeenCalledWith([PageRoutes.EMPTY_STATE]);
  });
});
