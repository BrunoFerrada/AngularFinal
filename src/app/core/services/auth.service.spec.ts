import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { environment } from '../../../environments/environment';
import { User } from '../../modules/dashboard/pages/users/models';

describe('AuthService', () => {
    let authService: AuthService;
    let router: Router;
    let httpTestingController: HttpTestingController;

    const initialState = {
        auth: {
        authUser: null,
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            AuthService,
            MockProvider(Router),
            provideMockStore({
                initialState,
            }),
        ],
        }).compileComponents();
        localStorage.clear();
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('AuthService debe instanciarse', () => {
            expect(authService).toBeTruthy();
    });

    it('Un login satisfactorio debe establecer el usuario autenticado, el access token en localStorage y redirigir al home', (done) => {
        const spyOnNavigate = spyOn(router, 'navigate');
        
        authService.login({
            email: 'admin@gmail.com',
            password: 'admin',
        })
        
  
        authService.authUser$.subscribe({
            next : (authUser) => {
                expect(authUser).toBeTruthy();
                expect(localStorage.getItem('access_token')).toBeTruthy();
                expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard', 'home']);
                done();
            }
        })
    });

    it('Un login incorrecto debe mostrar un alerta con el mensaje "Email o password invalidos"', (done) => {
        const spyOnAlert = spyOn(window, 'alert');
        
        authService.login({
            email: 'fake@gmail.com',
            password: 'fake',
        })
        
  
        authService.authUser$.subscribe({
            next : (authUser) => {
                expect(authUser).toBeFalsy();
                expect(localStorage.getItem('access_token')).toBeFalsy();
                expect(spyOnAlert).toHaveBeenCalledWith('Email o password invalidos');
                done();
            }
        })
    });

})