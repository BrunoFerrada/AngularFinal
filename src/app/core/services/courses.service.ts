import { Injectable } from "@angular/core";
import { concatMap, Observable, switchMap } from "rxjs";
import { Course } from "../../modules/dashboard/pages/courses/models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Teacher } from "../../modules/dashboard/pages/teachers/models";

@Injectable({ providedIn: 'root' })
export class CourseService {

    constructor (private httpClient: HttpClient) {}
    
    getCourseDetail(id: string): Observable<Course> {
        return this.httpClient.get<Course>(`${environment.baseApiUrl}/courses/${id}?_embed=teachers`);
    }

    addCourse(payload: { name: string }): Observable<Course[]> {
        return this.httpClient.post<Course>(`${environment.baseApiUrl}/courses`, payload).pipe(concatMap(() => this.getCourses()))
    }

    updateCourseById(id: string, data: { name: string }): Observable<Course[]> {
        return this.httpClient.patch<Course>(`${environment.baseApiUrl}/courses/${id}`, data).pipe(concatMap(() => this.getCourses()));;
    }

    getCourses() : Observable<Course[]> {
        return this.httpClient.get<Course[]>(`${environment.baseApiUrl}/courses`);
    }

    getCourse(courseId: string): Observable<Course> {
        return this.httpClient.get<Course>(`${environment.baseApiUrl}/courses/${courseId}`);
    }
    
    deleteCourseById(id:string): Observable<Course[]> {
        return this.httpClient.delete<Course>(`${environment.baseApiUrl}/courses/${id}`).pipe(concatMap(() => this.getCourses()));
    }

    addTeacherToCourse(courseId: string, teacherId: string): Observable<Course> {
        return this.getCourse(courseId).pipe(
            switchMap(course => {
                const updatedTeachers = [...(course.teachers || []), teacherId];
                return this.httpClient.patch<Course>(
                    `${environment.baseApiUrl}/courses/${courseId}`,
                    { teachers: updatedTeachers }
                );
            }),
            switchMap(() => this.getCourse(courseId))
        );
    }

    deleteTeacherFromCourse(courseId: string, teacherId: string): Observable<Course> {
        return this.getCourseDetail(courseId).pipe(
            concatMap(course => { const updatedTeachers = course.teachers?.filter(t => t.id !== teacherId);
                return this.httpClient.patch<Course>(`${environment.baseApiUrl}/courses/${courseId}`, { teachers: updatedTeachers });
            })
        );
    }
}