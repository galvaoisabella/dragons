import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Dragon } from '../../interface/dragons.interface';
import { DragonsService } from '../../services/dragons.service';
import { Location } from '@angular/common';

import { RegisterDragonComponent } from './register-dragon.component';
import { Router } from '@angular/router';
import { PageRoutes } from 'src/app/enum/page-routes.enum';

describe('RegisterDragonComponent', () => {
  let component: RegisterDragonComponent;
  let fixture: ComponentFixture<RegisterDragonComponent>;
  let dragonsService: DragonsService;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDragonComponent ],
      imports: [        
        BrowserDynamicTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDragonComponent);
    dragonsService = TestBed.inject(DragonsService);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call editDragon - infoEdited null', () => {
    const dragon: Dragon = {
      createdAt:'',
      histories:'teste',
      name:'teste',
      type:'teste',
      id:''
    }
    spyOn(dragonsService, 'createDragon').and.returnValue(of(true));
    spyOn(location, 'back').and.callThrough();

    fixture.detectChanges();
    component.createDragon(dragon);

    expect(dragonsService.createDragon).toHaveBeenCalled();
  });

  it('should callfake createDragon and return error', () => {
    const dragon: Dragon = {
      createdAt:'',
      histories:'teste',
      name:'teste',
      type:'teste',
      id:''
    }
    spyOn(dragonsService, 'createDragon').and.returnValue(throwError(new Error('')));
    spyOn(router, 'navigate').and.callThrough();

    fixture.detectChanges();
    component.createDragon(dragon);

    expect(dragonsService.createDragon).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([PageRoutes.EMPTY_STATE]);
  });
});
