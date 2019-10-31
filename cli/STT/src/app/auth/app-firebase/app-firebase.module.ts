import { NgModule } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { environment} from '../../../environments/environment';
import { AngularFireAuthModule } from  'angularfire2/auth';



@NgModule({
  
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  exports:[
    AngularFireModule,
    AngularFireAuthModule
  ]

})
export class AppFirebaseModule { }
