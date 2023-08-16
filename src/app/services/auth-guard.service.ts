import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { TokenStorageService } from "./token-storage.service";

export function canActivate(): CanActivateFn {
    return () => {
        const router: Router = inject(Router);
        const tokenStorageService: TokenStorageService = inject(TokenStorageService);

        if (!tokenStorageService.getToken()) {
            console.log("User not logged in.");

            router.navigate(["login"]);
            return false;
        }
        console.log('eita: ', tokenStorageService.getToken())
        return true;
    }
}
// }
