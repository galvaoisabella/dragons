import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Dragon } from '../interface/dragons.interface';

@Injectable({
  providedIn: 'root'
})

export class DragonsService {

  private readonly API = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

  constructor(private http: HttpClient) { }

  /**
   * Get the list of dragons
   * @returns dragons list
   */
  listDragons() {
    return this.http.get<Dragon[]>(`${this.API}`);
  }

  /**
   * Get the details of a dragon
   * @param id dragon index
   * @returns details of the dragon
   */
  getDragonDetails(id: string) {
    return this.http.get<Dragon>(`${this.API}/${id}`)
  }

  /**
   * Create a dragon
   * @param dragon infos
   * @returns status
   */
   createDragon(dragon: Dragon) {
    return this.http.post<any>(`${this.API}`, dragon);
  }

   /**
   * Edit infos of a dragon
   * @param id dragon index
   * @param infoEdited dragon infos edited
   * @returns status
   */
    editDragon(id: string, infoEdited: any) {
      return this.http.put<any>(`${this.API}/${id}`, infoEdited)
    }

   /**
   * Delete a dragon
   * @param id dragon index
   * @returns status
   */
     deleteDragon(id: string) {
      return this.http.delete<any>(`${this.API}/${id}`)
    }

}
