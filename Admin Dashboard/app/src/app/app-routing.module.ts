import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { FavotitesComponent } from './favotites/favotites.component';
import { FollowingComponent } from './following/following.component';
import { MypostsComponent } from './myposts/myposts.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { RouteGuard} from './auth/route-guard';
import { UploadFormComponent} from './uploads/upload-form/upload-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { USERSComponent } from './users/users.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
const routes: Routes = [
{ path:'',component:LoginComponent },
{ path:'allposts',component: AllPostsComponent ,canActivate:[RouteGuard]},
{ path:'favorites',component:FavotitesComponent ,canActivate:[RouteGuard]},
{ path:'addusers',component:SignUpComponent ,canActivate:[RouteGuard]},
{ path:'following',component:FollowingComponent ,canActivate:[RouteGuard]},
{ path:'lstusers',component:USERSComponent,canActivate:[RouteGuard]},
{ path:'sdmn',component:SideMenuComponent },
{ path:'myposts',component:AllPostsComponent ,canActivate:[RouteGuard]},
{ path:'myxposts',component:MypostsComponent ,canActivate:[RouteGuard]},
{ path:'login',component:LoginComponent },
{ path: '**', component: PageNotFoundComponent }
//{ path:'logout',component:HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
