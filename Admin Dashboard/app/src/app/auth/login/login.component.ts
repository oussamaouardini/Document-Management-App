import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/shared/notification.service';
import *as firebase from 'firebase';
import { MyFireService } from 'src/app/shared/myfire.service';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private notifier : NotificationService,
    private myfire: MyFireService,
    private userService : UserService,
    private router : Router,
    public afAuth :AngularFireAuth
    ) { }


    emaidxl= true ;

    message:any;
    fail = false


  ngOnInit() {
    this.afAuth.authState.subscribe((user)=>console.log(user));
   
  }

  email(){

    this.emaidxl = !this.emaidxl ; 
  }

  
  googlesignInViaPopup(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()) .then((userCredentials)=>
    
    firebase.database().ref('users/'+userCredentials.user.uid).set({
      email:userCredentials.user.email,
uid:userCredentials.user.uid,
registationDate:new Date().toString(),
name: userCredentials.user.displayName,
categorie:"user"


    })

    
    .then(()=>{


return this.myfire.GetUserFromDatabase(userCredentials.user.uid);
    })
    .then(userDataFromDatabase =>{

      if(userDataFromDatabase){
        this.userService.set(userDataFromDatabase);
        this.router.navigate(['/allposts']);
        window.location.reload();
      }
    })
    
    
    );
    
  }
  googlesignInViaRedirect(){
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider()) .then((userCredentials)=>
    console.log(userCredentials)
    );
  }
  
  FacebooksignInViaPopup() : void {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()) .then((userCredentials)=>
    


    firebase.database().ref('users/'+userCredentials.user.uid).set({
      email:userCredentials.user.email,
uid:userCredentials.user.uid,
registationDate:new Date().toString(),
name: userCredentials.user.displayName,
facebookemailverified:true,
categorie:"user"


    })
    .then(()=>{
      
      return this.myfire.GetUserFromDatabase(userCredentials.user.uid);
          })
          .then(userDataFromDatabase =>{

            if(userDataFromDatabase){
              this.userService.set(userDataFromDatabase);
              this.router.navigate(['/myposts']);
              window.location.reload();
            }
          })

    );
  }
  FacebooksignInViaRedirect(){
    this.afAuth.auth.signInWithRedirect(new auth.FacebookAuthProvider()) .then((userCredentials)=>
    
    
    console.log(userCredentials));
  
  }

 


onSubmit(form :NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    
    firebase.auth().signInWithEmailAndPassword(email,password).then(userData=>{
      if(userData.user.emailVerified){
        return this.myfire.GetUserFromDatabase(userData.user.uid);
      }else {

        this.message = "your email is not verified";
        this.fail=true;
        setTimeout(()=>{
          this.fail=false;
          this.message=null;
          
            },3000)
      //  this.notifier.display('error',message);
       // firebase.auth().signOut();
      }
    }).then(userDataFromDatabase =>{

      if(userDataFromDatabase){
        this.userService.set(userDataFromDatabase);
        this.router.navigate(['/allposts']);
        window.location.reload();
      }
    }).catch(err=>{

      this.message=err.message;
      this.fail=true;
        setTimeout(()=>{
          this.fail=false;
          this.message=null;
          
            },3000)
      this.notifier.display('error',err.message);
    });
}







}
