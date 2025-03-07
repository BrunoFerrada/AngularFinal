import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { TeacherService } from '../../../../../../core/services/teachers.service';
import { Teacher } from '../../../teachers/models';

@Component({
    selector: 'app-course-detail',
    standalone: false,
    templateUrl: './course-detail.component.html',
    styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
    isAdmin$: Observable<boolean>;
    dataSource: Teacher[] = [];
    isLoading = false;
    course: Course | null = null;
    errorMessage = '';
    teachersList: Teacher[] = [];
    selectedTeacherId: string = '';

    constructor(
        private courseService: CourseService,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private teacherService: TeacherService
    ) {
        this.isAdmin$ = this.authService.IsAdmin$;
    }

    handleCourseUpdate(data: Teacher[]): void {
        if (data && data.length > 0) {
            this.dataSource = [...data];
        } else {
            console.warn('No se encontraron profesores en el curso');
            this.dataSource = [];
        }
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.loadTeachers();

        this.courseService.getCourseDetail(this.activatedRoute.snapshot.params['id']).subscribe({
        next: (course) => {
            this.course = course;
            if (course.teachers && course.teachers.length > 0) {
            this.handleCourseUpdate(course.teachers);
            }
        },
        error: (error) => {
            this.isLoading = false;
            if (error instanceof HttpResponse && error.status === 404) {
            this.errorMessage = 'El curso no existe';
            }
        },
        complete: () => {
            this.isLoading = false;
        },
        });
    }

    addTeacher(teacherId: string): void {
        if (!this.course?.id) {
            alert('El ID del curso no está definido.');
        return;
        }

        const isTeacherAlreadyAdded = this.course.teachers?.some(t => t.id === teacherId);
        if (isTeacherAlreadyAdded) {
            alert('El profesor ya está agregado a este curso.');
            return;
        }

        this.courseService.addTeacherToCourse(this.course.id, teacherId)
        .subscribe({
            next: (updatedCourse) => {
            const teacherToAdd = updatedCourse.teachers?.find(t => t.id === teacherId);
                if (teacherToAdd) {
                    this.course!.teachers?.push(teacherToAdd);
                    this.handleCourseUpdate(this.course!.teachers!);
                    alert('El profesor ya fue agregado.');
                }
            },
            error: (err) => {
                console.error('Error al agregar el profesor', err);
            }
        });
    }

    removeTeacher(teacherId: string): void {
        if (!this.course?.id) {
            alert('El ID del curso no está definido.');
            return;
        }

        this.courseService.deleteTeacherFromCourse(this.course?.id, teacherId)
        .subscribe({
            next: () => {
                alert('Profesor eliminado con éxito');
                this.course!.teachers = this.course!.teachers?.filter(t => t.id !== teacherId);
                this.handleCourseUpdate(this.course!.teachers!);
            },
            error: (err) => {
                alert('Error al eliminar el profesor');
            }
        });
    }

    loadTeachers(): void {
        this.teacherService.getTeachers().subscribe({
            next: (teachers) => {
                this.teachersList = teachers;
            },
            error: (err) => {
                console.error('Error al cargar los profesores', err);
            }
        });
    }

    loadTeachersForCourse(teacherIds: string[]): void {
        this.teacherService.getTeachers().subscribe({
            next: (allTeachers) => {
                this.dataSource = allTeachers.filter(teacher => teacherIds.includes(teacher.id));
            },
            error: (err) => {
                console.error('Error al cargar los profesores', err);
            }
        });
    }
}