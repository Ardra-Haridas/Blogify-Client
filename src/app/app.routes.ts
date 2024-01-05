import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CreateblogComponent } from './createblog/createblog.component';
import { CommunityComponent } from './community/community.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';

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
    },
    {
    path:"blog/:id",
    component:BlogComponent,
    title:"Blog | BlogApp"
    },
    {
    path:"createblog",
    component:CreateblogComponent,
    title:"Createblog | BlogApp"
    },
    {
    path:"editblog/:blogId",
    component:CreateblogComponent,
    title:"Createblog | BlogApp"
    },
    {
        path:"community",
        component:CommunityComponent,
        title:"Community |BlogApp"
    },
    {
        path:"about",
        component:AboutComponent,
        title:"About |BlogApp"
    },
    {
        path:"contact",
        component:ContactComponent,
        title:"Contact |BlogApp"
    },
    {
        path:"profile/:id",
        component:ProfileComponent,
        title:"Profile |BlogApp"
    },
];

