import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipo-solicitud.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TipoSolicitudService {

  url: string = GeneralData.BUSSINESS_URL;
  token: string = "";
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { 
    this.token = this.localStorage.GetToken();
  }
  
  //CAMBIAR DESPUES DE THIS.URL POR LAS DEL BACKEND Y LOS NOMBRES DE VARIABLES A COMO SE RECIBAN EN LOS 
  //MODELOS DEL BACKEND

  GetRecordList(): Observable<TipoSolicitudModel[]> {
    return this.http.get<TipoSolicitudModel[]>(`${this.url}/tipo-solicituds`)
  }

  SaveRecord(data: TipoSolicitudModel): Observable<TipoSolicitudModel> {
    console.log(this.token, "aqui esta el token");
    
    return this.http.post<TipoSolicitudModel>(`${this.url}/tipo-solicituds`, {
      nombre: data.nombre,
      formato: data.formato
    },
     {headers:
      new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    } 
     )
  }

  SearchRecord(id: number): Observable<TipoSolicitudModel> {
    return this.http.get<TipoSolicitudModel>(`${this.url}/tipo-solicituds/${id}`);
  }

  EditRecord(data: TipoSolicitudModel): Observable<TipoSolicitudModel> {
    return this.http.put<TipoSolicitudModel>(
      `${this.url}/tipo-solicituds/${data.id}`,
      {
        id: data.id,
        nombre: data.nombre,
        formato: data.formato,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(id: number):Observable<any>{
    return this.http.delete(
      `${this.url}/tipo-solicituds/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
}
