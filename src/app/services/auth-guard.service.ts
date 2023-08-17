import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { TokenStorageService } from "./token-storage.service";

export function canActivate(): CanActivateFn {
    return () => {
        const router: Router = inject(Router);
        const tokenStorageService: TokenStorageService = inject(TokenStorageService);

        if (!tokenStorageService.getToken()) {
            router.navigate(["login"]);
            return false;
        }

        return true;
    }
}
// }
