import { Routes } from '@angular/router';
import { E404Component } from '@components/e404/e404.component';
import { LoginComponent } from '@components/login/login.component';
import { authGuard } from '@guards/auth.guard';


export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", loadComponent: () => LoginComponent, title: "Inicio" },
    { path: "signin", loadComponent: () => import("@components/signup/signup.component").then(c => c.SignupComponent), title: "Crea una cuenta" },
    { path: "activate", loadComponent: () => import("@components/activate-account/activate-account.component").then(c => c.ActivateAccountComponent), title: "Activar cuenta" },
    //GENERAL
    { path: "home", title: "Arrienda Ya", loadComponent: () => import("@components/home/home.component").then(c => c.HomeComponent), canActivate: [authGuard] },
    { path: "property", loadComponent: () => import("@components/property/propertydetails/propertydetails.component").then(c => c.PropertydetailsComponent), title: "Detalles", canActivate: [authGuard] },

    { path: "requests", loadComponent: () => import("@components/rent-requests/general/rent-requests.component").then(c => c.RentRequestsComponent), title: "Mis solicitudes", canActivate: [authGuard] },
    { path: "e404", loadComponent: () => E404Component, title: "404" },
    { path: "**", redirectTo: "e404" }
];

