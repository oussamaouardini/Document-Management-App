import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { from } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'appaftereat';

  constructor(private spinner: NgxSpinnerService) {}
ngOnInit(){

  
  var firebaseConfig = {
    apiKey: "AIzaSyD3aczbkdmI4605vKRdT9n2tzSmnV0rhEU",
    authDomain: "stageproject-c9d92.firebaseapp.com",
    databaseURL: "https://stageproject-c9d92.firebaseio.com",
    projectId: "stageproject-c9d92",
    storageBucket: "stageproject-c9d92.appspot.com",
    messagingSenderId: "977184467047",
    appId: "1:977184467047:web:881b51739a00293c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  /** spinner starts on init */
  this.spinner.show();
 
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 2000);

}

  


}
