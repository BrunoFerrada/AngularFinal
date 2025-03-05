import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap } from 'rxjs';
import { Student } from '../../modules/dashboard/pages/students/models';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor (private httpClient: HttpClient) {}


    addStudent(payload: { name: string }): Observable<Student[]> {
        return this.httpClient.post<Student>(`${environment.baseApiUrl}/students`, payload).pipe(concatMap(() => this.getStudents()))
    }
      
    updateStudentById(id: string, data: { name: string }): Observable<Student[]> {
        return this.httpClient.patch<Student>(`${environment.baseApiUrl}/students/${id}`, data).pipe(concatMap(() => this.getStudents()));;
    }
      
    getStudents() : Observable<Student[]> {
        return this.httpClient.get<Student[]>(`${environment.baseApiUrl}/students`);
    }
          
    deleteStudentById(id:string): Observable<Student[]> {
        return this.httpClient.delete<Student>(`${environment.baseApiUrl}/students/${id}`).pipe(concatMap(() => this.getStudents()));
    }
}
