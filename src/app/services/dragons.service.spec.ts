import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Dragon } from '../interface/dragons.interface';

import { DragonsService } from './dragons.service';

describe('DragonsService', () => {
  let service: DragonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        DragonsService
      ]
    });
    service = TestBed.inject(DragonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call list and return  status ok', () => {
    const dragon: Dragon = {
      id: '',
      createdAt: '',
      name: '',
      type: '',
      histories: '',
    }
    let httpClient = TestBed.inject(HttpClient);
    const mockHttp = spyOn(httpClient, 'get').and.returnValue(of([dragon]));

    service.listDragons().subscribe(res => {
      expect(res).toEqual([dragon]);
    })

    expect(mockHttp).toHaveBeenCalledWith(
      service['API']
    );
  });

  it('should call details and return  status ok', () => {
    const dragon: Dragon = {
      id: '',
      createdAt: '',
      name: '',
      type: '',
      histories: '',
    }
    let httpClient = TestBed.inject(HttpClient);
    const mockHttp = spyOn(httpClient, 'get').and.returnValue(of(dragon));

    service.getDragonDetails('0').subscribe(res => {
      expect(res).toEqual(dragon);
    })

    expect(mockHttp).toHaveBeenCalledWith(
      `${service['API']}/0`
    );
  });

  it('should call create and return  dragon', () => {
    const dragon: Dragon = {
      id: '',
      createdAt: '',
      name: '',
      type: '',
      histories: '',
    }
    let httpClient = TestBed.inject(HttpClient);
    const mockHttp = spyOn(httpClient, 'post').and.returnValue(of(dragon));

    service.createDragon(dragon).subscribe(res => {
      expect(res).toEqual(dragon);
    })

    expect(mockHttp).toHaveBeenCalledWith(
      service['API'], dragon
    );
  });

  it('should call edit and return  dragon', () => {
    const dragon: Dragon = {
      id: '',
      createdAt: '',
      name: '',
      type: '',
      histories: '',
    }
    let httpClient = TestBed.inject(HttpClient);
    const mockHttp = spyOn(httpClient, 'put').and.returnValue(of(dragon));

    service.editDragon('0',dragon).subscribe(res => {
      expect(res).toEqual(dragon);
    })

    expect(mockHttp).toHaveBeenCalledWith(
      `${service['API']}/0`, dragon
    );
  });

  it('should delete edit and return  dragon', () => {
    const dragon: Dragon = {
      id: '',
      createdAt: '',
      name: '',
      type: '',
      histories: '',
    }
    let httpClient = TestBed.inject(HttpClient);
    const mockHttp = spyOn(httpClient, 'delete').and.returnValue(of(dragon));

    service.deleteDragon('0').subscribe(res => {
      expect(res).toEqual(dragon);
    })

    expect(mockHttp).toHaveBeenCalledWith(
      `${service['API']}/0`
    );
  });


});
