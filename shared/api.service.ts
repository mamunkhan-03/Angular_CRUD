import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmployee(data: any){
    return this.http.post<any>(`http://localhost:9192/api/employees`, data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  getEmployee(){
    return this.http.get<any>(`http://localhost:9192/api/employees`)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  updateEmployee(data: any, id:number){
    return this.http.put<any>(`http://localhost:9192/api/employees/${id}`,data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  deleteEmployee(id: number){
    return this.http.delete<any>(`http://localhost:9192/api/employees/${id}`)
    .pipe(map((res:any) => {
      return res;
    }))
  }

 



}
