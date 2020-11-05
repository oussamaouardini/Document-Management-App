import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase'; 
import { AngularFireDatabase } from 'angularfire2/database';
import { NotificationService } from '../shared/notification.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class USERSComponent implements OnInit {

  constructor(public db: AngularFireDatabase  ,private notifier : NotificationService  , private userService:UserService,private router:Router  ) { }

  usersnames : any = [];
  nbusers = 1  ; 
  userRef : any ; 
  updt = false;
  showpsf = false;
  isLoggedIn:boolean = false;


  onlogout(){
    firebase.auth().signOut().then(
      ()=>{
        this.userService.destroy();
        this.isLoggedIn = false ;
        window.location.reload();
        window.location.reload();
      });
  }

  ngOnInit() {

    this.userRef = firebase.database().ref('users').limitToFirst(100000);
    this.userRef.on('child_added',data =>{
      this.usersnames.push({
        key :data.key,
        data : data.val()
      });
     this.nbusers = this.nbusers +1 ;
    });


  }

  delete(id){

    if(confirm('do you confirm removing this file')){
      var listRef = this.db.list('users/'+id).remove();
    }
    else{
      ///
    }
     
  

  }
  update(id,email,name,passwd){
    this.updt=true;
  
    var message= 'double tape on  the field you want update' ;
    this.notifier.display('sfer',message);

    this.notifier.display('fsd','    ');
   //this.bedel(id,email,name,regdate,passwd);

  }

  bedeluid(id,email,name,passwd){

     
    
  }








  bedelmail(id,email,name,passwd){

    if(this.updt==false){

    }else{



      firebase.database().ref('/users/'+id).once('value').then(snapshot =>{


        var postData = {
          email:prompt('enter the new email'),
          name: name,
          password: passwd,
          registrationDate : snapshot.val().registrationDate,
          uid: id
          
        };
        firebase.database().ref('/users/'+id).update(postData);
       
  
      })


    }
  





    
  
}




















bedelname(id,email,name,passwd){

  if(this.updt==false){

  }else{



    firebase.database().ref('/users/'+id).once('value').then(snapshot =>{

console.log(snapshot.val());
      var postData = {
        email: email,
        name: prompt('enter the new name'),
        password: passwd,
        registrationDate : 'regdate',
        uid: id
        
      };
      firebase.database().ref('/users/'+id).update(postData);
     

    })


  }


}



















bedelpass(id,email,name,passwd){

  if(this.updt==false){

  }else{



    firebase.database().ref('users/'+id).once('value').then(snapshot =>{


      var postData = {
        email:email,
        name: name,
        password:prompt('enter the new email'),
        registrationDate : 'regdate',
        uid: id
        
      };
      firebase.database().ref('/users/'+id).update(postData);
     

    })


  }


}

















// Validating Empty Field
 check_empty() {
  if ((document.getElementById('name')as HTMLInputElement).value == "" || (document.getElementById('email')as HTMLInputElement).value== "" || (document.getElementById('msg')as HTMLInputElement).value == "") {
  alert("Fill All Fields !");
  } else {
    (document.getElementById('upddescription')as HTMLInputElement).onsubmit;
  alert("Form Submitted Successfully...");
  }
  }

psswd:string;
nnm:string;
mmiil:string;
iiiid:string;





  //Function To Display Popup
  div_show(id,email,name,password) {
    (document.getElementById('name') as HTMLInputElement).value =name;
    (document.getElementById('email') as HTMLInputElement).value =email;
    (document.getElementById('password') as HTMLInputElement).value =password;
  document.getElementById('abc').style.display = "block";
  this.psswd=password;
  this.mmiil=email;
  this.iiiid=id;
  this.nnm=name;
  console.log(this.iiiid,this.nnm,this.psswd,this.mmiil);
 
  }

  delet_show(id,email,name,password) {
    document.getElementById('delet').style.display = "block";
    this.psswd=password;
    this.mmiil=email;
    this.iiiid=id;
    this.nnm=name;
   
   
    }


    statuu(input: HTMLInputElement){

 
      if(input.checked === true)
      {
       
        if(input.value == 'yes')
        {
          this.yesconfirm();
          this.delet_hide();
        }

        else 
        {
         this.delet_hide()
        }
      }
    
}





    delet_hide(){
      document.getElementById('delet').style.display = "none";
      }

      yesconfirm(){
var id = this.iiiid;
        var listRef = this.db.list('users/'+id).remove();
      }



  //Function to Hide Popup
  div_hide(){
  document.getElementById('abc').style.display = "none";
  }

 // onSubmit(form : NgForm,name,Ccreationdate,ffileid,ddescription,uuserid,vaaluestatu,autthorName,eemail,AallowUsers,ffilestatu){

  nbedlou(){
    var nome = (document.getElementById('name')as HTMLInputElement).value ;
    var email = (document.getElementById('email')as HTMLInputElement).value ;
    var passwd = (document.getElementById('password')as HTMLInputElement).value ;
    
    var identificateur=this.iiiid;
    var frmail = this.mmiil;
    var passworrdd = this.psswd;
    var frname = this.nnm;
    console.log(identificateur,frmail,passworrdd,frname)
    
    var upda =  firebase.database().ref("/users/"+identificateur).once('value').then(snapshot =>{
      var postData = {
        email:email || frmail,
        name: nome||frname,
        password:passwd ||passworrdd || null,
       // registationDate:snapshot.val().registrationDate,
        uid:identificateur
      };
  
      firebase.database().ref('/users/'+identificateur).update(postData);
      
  
    })
   this.div_hide();
 
  }

  
 
  chowpsd(id,psd){
    if(! this.showpsf){
      (document.getElementById(id) as HTMLInputElement).innerHTML = psd;
    this.showpsf =! this.showpsf ;
    
    }
    else{
      (document.getElementById(id) as HTMLInputElement).innerHTML = "**********";
      this.showpsf =! this.showpsf ;
    }
   
  }






}
