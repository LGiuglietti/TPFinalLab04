import { inject } from "@angular/core";
import { AuthService } from "../core/services/auth.service";
import { Router } from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { User } from "../core/Models";

function checkAuthStatus(): boolean | Observable<boolean>{
    const authService = inject(AuthService);
    const router = inject(Router);

    //const user: User | undefined = authService.currentUser

    return authService.checkStatusAutentication()
        .pipe(
            tap(isAuth =>{
                if(isAuth){
                    console.log("Respuesta LogIn: ", isAuth);                    
                    router.navigate(['/main'])
                }
            }),
            map(isAuth => !isAuth)
        )
}

export const LoginGuard = () =>{
    return checkAuthStatus();
}