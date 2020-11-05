import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { NotificationService } from 'src/app/shared/notification.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { MyFireService } from 'src/app/shared/myfire.service';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private notifier: NotificationService, public afAuth :AngularFireAuth,private myfire: MyFireService, private userService : UserService,private router : Router,
    ) { }
uid : any ;
correct = false;
message :any ;
errorr : any;
fail =false;

  ngOnInit() {
    this.afAuth.authState.subscribe((user)=>console.log(user));
  }

  googlesignInViaPopup(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()) .then((userCredentials)=>
    
    firebase.database().ref('users/'+userCredentials.user.uid).set({
      email:userCredentials.user.email,
uid:userCredentials.user.uid,
registationDate:new Date().toString(),
name: userCredentials.user.displayName,

    }).then(()=>{

      firebase.auth().signOut();
      window.location.reload();
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
facebookemailverified:true


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
  
  
  FffacebooksignInViaPopup(){
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()) .then((userCredentials)=>console.log(userCredentials));
  }
  FacebooksignInViaRedirect(){
    this.afAuth.auth.signInWithRedirect(new auth.FacebookAuthProvider()) .then((userCredentials)=>console.log(userCredentials));
  
  }
  check_valid_em(){
    var email =  document.getElementById('email');
    if((email as HTMLInputElement).value == ''){
      document.getElementById('email').style.border = ' 2px solid red';
    }
    
  }


check_valid(){
var name =  document.getElementById('fullname');
if((name as HTMLInputElement).value == ''){
  document.getElementById('fullname').style.border = ' 2px solid red';
}



}

  seepass(){
    let input = document.getElementById('password'),
  
      icon = document.querySelector('.fa');
  //icon.addEventListener("click", function(){
    if(input.getAttribute("type") === "password"){
      icon.setAttribute("class", "fa fa-eye-slash");
      input.setAttribute("type", "text");
    }else{
      icon.setAttribute("class", "fa fa-eye");
      input.setAttribute("type", "password");
    }
 
  
  }
  /****************************************** */
  check(){
    
      if ((document.getElementById('password') as HTMLInputElement).value==
        (document.getElementById('password2')as HTMLInputElement ).value) {
        //document.getElementById('password2').style.color = 'green';
        document.getElementById('password2').style.border = '2px solid  green ' ;
        return true;
       // document.getElementById('password2').innerHTML = 'matching';
      } else {
       // document.getElementById('password2').style.color = 'red';
        document.getElementById('password2').style.border = '2px solid red ' ;
        return false;
       // document.getElementById('password2').innerHTML = 'not matching';
      }
    
  }


  onSubmit(form : NgForm){

console.log(form.value.password , form.value.email ,form.value.fullname)
  if(this.check()) {
    const fullname = form.value.fullname;
    const password = form.value.password;
    const email = form.value.email;
firebase.auth().createUserWithEmailAndPassword(email ,password).then(userData=>{
  userData.user.sendEmailVerification();



  this.message =` A Verification Email has been sent to ${email} .Kindly check your inbox and follow the steps in the verifications once verification is complete plaase log-in to the application `;
 // this.notifier.display('success',message);
 this.correct=true;
  setTimeout(()=>{
    this.correct=false;
    this.message=null;
    
      },3000)


return firebase.database().ref('users/'+userData.user.uid).set({
email:email,
uid:userData.user.uid,
registationDate:new Date().toString(),
name: fullname,
password:password,
categorie:"User"
}).then(()=>{
  firebase.auth().signOut();
});
  

})
.catch(err=>{


  this.errorr = err;
  this.fail = true;
 
  setTimeout(()=>{
   this.fail=false;
   this.errorr=null;
 
     },3000)

  this.notifier.display('error',err);
  console.log(err);
})
  }else{

    this.notifier.display('error','passwords do not match. Please  Try Again ');


    
    this.errorr = 'passwords do not match. Please  Try Again ';
 this.fail = true;

 setTimeout(()=>{
  this.fail=false;
  this.errorr=null;
  
    },3000)



  }
 
  }

  
}
