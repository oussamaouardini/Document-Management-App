import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { FollowingComponent } from './following/following.component';
import { MypostsComponent } from './myposts/myposts.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { FavotitesComponent } from './favotites/favotites.component';
import { HomeComponent } from './home/home.component';
import { RouteGuard} from './auth/route-guard';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './shared/notification.service';
import { MyFireService } from './shared/myfire.service';
import { UserService } from './shared/user.service';
import { UploadService} from '../app/uploads/shared/upload.service';
/*
import { UploadListComponent } from './upload/upload-list/upload-list.component';
import { UploadFormComponent } from './upload/upload-form/upload-form.component';*/
import { NgxSpinnerModule } from "ngx-spinner";
import { UploadFormComponent } from './uploads/upload-form/upload-form.component';
import { from } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
//import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { PostComponent } from './shared/post/post.component';
import { AppFirebaseModule} from './auth/app-firebase/app-firebase.module';

import { HttpClientModule } from '@angular/common/http';
import {  PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { USERSComponent } from './users/users.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllPostsComponent,
    FollowingComponent,
    MypostsComponent,
    SignUpComponent,
    LoginComponent,
    FavotitesComponent,
    HomeComponent,
    NotificationComponent,
    UploadFormComponent,
    PostComponent,
    PageNotFoundComponent,
    USERSComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    AppFirebaseModule,
    HttpClientModule,
    NgxSpinnerModule,
    
   // PdfJsViewerModule // <-- Add to declarations
  ],
  providers: [RouteGuard,NotificationService,MyFireService,UserService,UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
