import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { PageRoutes } from 'src/app/enum/page-routes.enum';
import { Dragon } from 'src/app/interface/dragons.interface';
import { DragonsService } from 'src/app/services/dragons.service';
import { DragonDetailsComponent } from '../dragon-details/dragon-details.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { RegisterDragonComponent } from '../register-dragon/register-dragon.component';
import { DragonsListComponent } from './dragons-list.component';

const mockDragonList = [
  {
    "createdAt": "2021-08-01T20:38:45.788Z",
    "name": "Viserion",
    "type": "Fire",
    "histories": "Valar Dohaeris",
    "id": "14"
  },
  {
    "createdAt": "2021-08-01T09:03:55.446Z",
    "name": "Rhaegal",
    "type": "Fire",
    "histories": "Lorem Ipsum",
    "id": "15"
  }
]

describe('DragonsListComponent', () => {
  let component: DragonsListComponent;
  let fixture: ComponentFixture<DragonsListComponent>;
  let dragonsService: DragonsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DragonsListComponent,
        RegisterDragonComponent,
        EmptyStateComponent
      ],
      imports: [
        BrowserDynamicTestingModule,
        RouterTestingModule.withRoutes([
          { path: PageRoutes.DRAGONS_LIST, component: DragonsListComponent },
          { path: PageRoutes.EMPTY_STATE, component: EmptyStateComponent },
          { path: PageRoutes.DRAGON_DETAILS, component: DragonDetailsComponent },
          { path: PageRoutes.REGISTER_DRAGON, component: RegisterDragonComponent }]),
        HttpClientModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonsListComponent);
    dragonsService = TestBed.inject(DragonsService);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call listDragon', () => {
    spyOn(dragonsService, 'listDragons').and.returnValue(of(mockDragonList));

    fixture.detectChanges();
    component.ngOnInit();

    expect(dragonsService.listDragons).toHaveBeenCalled();
  });

  it('should call editDragon - infoEdited null', () => {
    const dragon: Dragon = {
      createdAt: '',
      histories: '',
      name: '',
      type: '',
      id: ''
    }
    spyOn(dragonsService, 'editDragon').and.returnValue(of(mockDragonList));

    fixture.detectChanges();
    component.editDragon(dragon, dragon);

    expect(dragonsService.editDragon).toHaveBeenCalled();
  });

  it('should call editDragon - infoEdited null', () => {
    const dragon: Dragon = {
      createdAt: '',
      histories: 'teste',
      name: 'teste',
      type: 'teste',
      id: ''
    }
    spyOn(dragonsService, 'editDragon').and.returnValue(of(mockDragonList));

    fixture.detectChanges();
    component.editDragon(dragon, dragon);

    expect(dragonsService.editDragon).toHaveBeenCalled();
  });

  it('should call deleteDragon', () => {
    spyOn(dragonsService, 'deleteDragon').and.returnValue(of(mockDragonList));

    fixture.detectChanges();
    component.deleteDragon('1');

    expect(dragonsService.deleteDragon).toHaveBeenCalled();
  });

  it('should redirect to details', () => {
    spyOn(router, 'navigate').and.callThrough();

    fixture.detectChanges();
    component.redirectToDetails('');

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should redirect to register', () => {
    spyOn(router, 'navigate').and.callThrough();

    fixture.detectChanges();
    component.redirectToRegister();

    expect(router.navigate).toHaveBeenCalledWith([PageRoutes.REGISTER_DRAGON]);
  });

  it('should callfake deleteDragon and return error', () => {
    spyOn(dragonsService, 'deleteDragon').and.returnValue(throwError(new Error('')));
    spyOn(router, 'navigate').and.callThrough();

    fixture.detectChanges();
    component.deleteDragon('1');

    expect(dragonsService.deleteDragon).toHaveBeenCalled();
  });

  it('should callfake listDragon and return error', () => {
    spyOn(dragonsService, 'listDragons').and.returnValue(throwError(new Error('')));
    spyOn(router, 'navigate').and.callThrough();


    component.ngOnInit();
    fixture.detectChanges();

    expect(dragonsService.listDragons).toHaveBeenCalled();
  });

  it('should callfake editDragon and return error', () => {
    const dragon: Dragon = {
      createdAt: '',
      histories: '',
      name: '',
      type: '',
      id: ''
    }
    spyOn(dragonsService, 'editDragon').and.returnValue(throwError(new Error('')));
    spyOn(router, 'navigate').and.callThrough();


    component.editDragon(dragon, dragon);
    fixture.detectChanges();

    expect(dragonsService.editDragon).toHaveBeenCalled();
  });



});
