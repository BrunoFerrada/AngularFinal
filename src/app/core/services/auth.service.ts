import { Injectable } from "@angular/core";
import { LoginPayload } from "../../modules/auth/models";
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from "../../modules/dashboard/pages/users/models";
import { generateRandomString } from "../../shared/utils/idRandom";
import { Router } from "@angular/router";

const FAKE_USER_DB: User[] = [
    {
        id: 'Fde12',
        email: 'admin@gmail.com',
        password: 'admin',
        name: 'Admin',
        accessToken: 'asD12',
        role: 'ADMIN',
    },
    {
        id: 'lcI09',
        email: 'employee@gmail.com',
        password: 'employee',
        name: 'Empleado',
        accessToken: 'ñlk09',
        role: 'EMPLOYEE',
    },
]

@Injectable({ providedIn: 'root'})
export class AuthService 
{
    private _authUser$ = new BehaviorSubject<null | User>(null);
    authUser$ = this._authUser$.asObservable();

    constructor(private router: Router){}

    get IsAdmin$(): Observable<boolean> {
        return  this.authUser$.pipe(map((x) => x?.role === 'ADMIN'))
    }

    login(payload: LoginPayload): void 
    {
        const loginResult = FAKE_USER_DB.find((user) => user.email === payload.email && user.password === payload.password);
        
        if (!loginResult) 
        {
            alert('Credenciales incorrectas');
            return;
        }

        localStorage.setItem('access_token', loginResult.accessToken);
        this._authUser$.next(loginResult);
        this.router.navigate(['dashboard', 'home']);
    }

    logOut() {
        localStorage.removeItem('access_token');
        this._authUser$.next(null);
        this.router.navigate(['auth', 'login']);
    }

    isAuthenticated(): Observable<boolean> 
    {
        const storageUser = FAKE_USER_DB.find(x => x.accessToken === localStorage.getItem('access_token'))
        this._authUser$.next(storageUser || null);

        return this.authUser$.pipe(map((x) => !!x));
    }
}