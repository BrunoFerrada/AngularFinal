import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { concatMap, Observable } from "rxjs";
import { Teacher } from "../../modules/dashboard/pages/teachers/models";

@Injectable({ providedIn: 'root' })
export class TeacherService {

    constructor (private httpClient: HttpClient) {}


    addTeacher(payload: { name: string }): Observable<Teacher[]> {
        return this.httpClient.post<Teacher>(`${environment.baseApiUrl}/teachers`, payload).pipe(concatMap(() => this.getTeachers()))
    }
    
    updateTeacherById(id: string, data: { name: string }): Observable<Teacher[]> {
        return this.httpClient.patch<Teacher>(`${environment.baseApiUrl}/teachers/${id}`, data).pipe(concatMap(() => this.getTeachers()));;
    }
    
    getTeachers() : Observable<Teacher[]> {
        return this.httpClient.get<Teacher[]>(`${environment.baseApiUrl}/teachers`);
    }

    getTeacher(id: string) : Observable<Teacher> {
             return this.httpClient.get<Teacher>(`${environment.baseApiUrl}/teachers/${id}`);
    }
        
    deleteTeacherById(id:string): Observable<Teacher[]> {
        return this.httpClient.delete<Teacher>(`${environment.baseApiUrl}/teachers/${id}`).pipe(concatMap(() => this.getTeachers()));
    }
}