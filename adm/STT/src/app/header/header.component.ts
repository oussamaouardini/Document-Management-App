import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn:boolean = false;

  fbname:string;
  fbuid: string;
  fbemail:string;
  name:string;
  uid: string;
  email:string;
  constructor(private userService:UserService,private router:Router ){ }


  

  ngOnInit() {
    console.log(this.userService.getProfile());
    if(this.userService.getProfile().facebookemailverified){
     
      this.name = this.userService.getProfile().name;
      this.email = this.userService.getProfile().email;
      this.uid =this.userService.getProfile().uid;

      this.isLoggedIn=true;
        this.router.navigate(["/myposts"])
        const user=this.userService.getProfile();

    }else{
      this.userService.statusChange.subscribe(userData =>{
        if(userData){
         this.name = userData.this.name ;
          this.email = userData.this.email ;
          this.uid = userData.this.uid;
        }else{
          this.name = null; 
          this.email = null ;
          this.uid = null;
        }
      });

      firebase.auth().onAuthStateChanged(userData=>{
        if(userData &&userData.emailVerified)
        {
          this.isLoggedIn=true;
          this.router.navigate(["/myposts"])
          const user=this.userService.getProfile();
          if(user &&user.name)
          {
            this.name = user.name ;
          this.email = user.email ;
          this.uid = user.uid;
          }
        }
        else {
        this.isLoggedIn=false;
        
      }
      })
    }
  }

  onlogout(){
    firebase.auth().signOut().then(
      ()=>{
        this.userService.destroy();
        this.isLoggedIn = false ;

      });
  }

  mydrop(){
    document.getElementById('drp').setAttribute('class','drop');
  }

}
