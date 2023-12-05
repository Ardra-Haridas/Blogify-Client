import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path:"login",
        component:LoginComponent,
        title:"Login | BlogApp"
    },
    {
    path:"register",
    component:RegisterComponent,
    title:"Register | BlogApp"
    },
    {
    path:"home",
    component:HomeComponent,
    title:"Home | BlogApp"
    }
];
