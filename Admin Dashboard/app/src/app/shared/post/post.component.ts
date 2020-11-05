import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MyFireService } from '../myfire.service';
import { NotificationService } from '../notification.service';
import * as firebase from 'firebase';
import{ FormsModule} from '@angular/forms';


//import * as firebase from 'firebase';
import { UploadService } from 'src/app/uploads/shared/upload.service';
import { Upload } from '../../uploads/shared/upload';
import {AngularFireDatabase, snapshotChanges} from 'angularfire2/database';
import { PdfJsViewerModule, PdfJsViewerComponent } from 'ng2-pdfjs-viewer';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { String } from 'core-js';
//import { MyFireService } from '../myfire.service';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
//import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
  export class PostComponent implements OnInit {
    
    updat=false ; 
    islooged = true ; 
    downs= false ; 
   basePath:string = '/uploads';
   @Input() valuestatu;
   @Input()authorName;
   @Input() userid;
   @Input() checkedusers ;
   @Input() description;
   @Input() FileName ;
   @Input() Creationdate ;
   @Input() idfile;
   @Input() displaypostedby : boolean = false ; 
   @Input() email;
   @Input() AllowUsers;
   @Input() filestatu;
   checkeduser : any = [];
   expression = false;
   update = false ; 
   status = false ; 
   allRef : any ;
    loadMoreRef : any ; 
    all : any = [];
    nbfile = 0 ;
    nbcol=1;
   defaultImage:string="http://via.placeholder.com/150x150";
   FileData :any = {}
   usersnames : any = [];
   nbusers = 0  ; 
   userRef : any ; 
   favposts : any = [];
   favref : any ; 
   likked : false ; 
   islv : boolean ;
   miseaj : boolean = false ; 
   /*
    postData = {
    FileName:"this.fiiilnam",
    authorName: "ussss.name",
    uid: "ussss.uid",
    favoritecount:'0',
    filestatu:"valustatu",
    AllowUsers:"array",
    description : "prompt('add a description')",
    email:"ussss.email",
    Creationdate :"this.ladate" ,
    idfile : "fileID",
    liked:false
  };*/
   constructor( private uuuup : UploadService  , public db: AngularFireDatabase , public myfire : MyFireService ,private userService:UserService,
     private notifier : NotificationService) { }
  
  


  
     miseajour(){
       if((document.getElementById('upddescription')as HTMLInputElement).value == "" ){
        this.miseaj = false ; 
        return false ; 
       }
       else {
         this.miseaj = true ; 
         return true ; 
       }

     }


  
  
  
statuu(input: HTMLInputElement){

 
  if(input.checked === true && this.miseajour())
  {
    this.miseaj = true ; 
    if(input.value == 'private')
    {
      this.expression = true;
    }
    else if(input.value == 'public')
    {
      this.expression = false ; 
    }
  }else{
    this.miseaj = false ; 
    this.miseajour();
  }





  this.valuestatu = input.value;
  return (input.value);
    
  }
  
  selectionChange(input: HTMLInputElement){

    if((input.checked === false)){

for(var i = 0 ;i<this.nbusers ; i++){

  if(this.checkeduser[i]=== input.value){
    delete this.checkeduser[i];
  }
}
}

if(input.checked === true){
this.checkeduser.push(input.value);
}  
}

closeup()
{
  this.update=false;
}

onSubmit(form : NgForm,name,Ccreationdate,ffileid,ddescription,uuserid,vaaluestatu,autthorName,eemail,AallowUsers,ffilestatu){
      const up_description = form.value.description;
      const up_filestatu = this.valuestatu;
      const up_AllowUsers = this.checkeduser;
     var upda =  firebase.database().ref("/Uploaded-Files/"+ffileid).once('value').then(snapshot =>{


        var postData = {
          FileName:name,
          authorName: autthorName,
          uid: uuserid,
          favoritecount:'0',
          filestatu:up_filestatu || null,
          AllowUsers:up_AllowUsers || null,
          description : up_description,
          Creationdate :Ccreationdate ,
          idfile : ffileid,
        };
        firebase.database().ref('/Uploaded-Files/'+ffileid).update(postData);
        firebase.database().ref('/allposts/'+ffileid).update(postData);
        firebase.database().ref('/user-posts/'+ uuserid+'/'+ffileid).update(postData);

      })
     }

     out(){
       this.updat= false;
     }
  
     over(){

     this.updat=true ; 
     }
 
     updatedata(fid){

this.update = true ;
this.status = true;
      firebase.database().ref('/Uploaded-Files/'+fid).once('value').then(snapshot =>{
       })
     }
  
  
  
  
     genaratore_color(){
       
    
      var col = document.querySelectorAll('section');
      
      for(var i =0 ; i<=col.length;i++){
        if(this.nbcol==1){
          if(col[i]== undefined || col[i]=== undefined ){
          }else{
          col[i].setAttribute("class","blueclass");
          }
         this.nbcol++;
        }else
        if(this.nbcol==2){
         if(col[i]== undefined || col[i]=== undefined ){
                  }else{
                  col[i].setAttribute("class","greenclass");
                  }
                 this.nbcol++;
        }else
        if(this.nbcol==3){
         if(col[i]== undefined || col[i]=== undefined ){
                  }else{
                  col[i].setAttribute("class","redclass");
                  }
                 this.nbcol++;
        }else
        {
          if(col[i]== undefined || col[i]=== undefined ){
                    }else{
                    col[i].setAttribute("class","grayclass");
                    }
                   this.nbcol=1;
        }
      }
    }
  
  
     genarator_color(){
       
       console.log("generator");
       var col = document.querySelectorAll('section');
       console.log(col.length);
       for(var i =0 ; i<=col.length;i++){
         if(this.nbcol==1){
           
           console.log("1",col[i]);
           this.nbcol++;
           col[i].setAttribute("class","blueclass");
          
          
         }else
         if(this.nbcol==2){
           
           console.log("2",col[i]);
           
           this.nbcol++;
           col[i].setAttribute("class","greenclass");
           
          // i++;
         }else
         if(this.nbcol==3){
           /*
           col.forEach(function(car){
             car.setAttribute("class","clas_1");
           })*/
           console.log("3",col[i]);
           this.nbcol++;
           col[i].setAttribute("class","redclass");
           
          // i++;
         }else
         {
           //if(this.nbcol==4)
           /*
           col.forEach(function(car){
             car.setAttribute("class","clas_1");
           })*/
           console.log("4",col[i]);
           this.nbcol=1;
           col[i].setAttribute("class","grayclass");
           //i++;
         }
       }
     }
  
  
  
  
  
  ngOnInit() {
    this.allRef = firebase.database().ref('allposts').limitToFirst(10000);
  this.allRef.on('child_added',data => {
  this.nbfile+=1;
    this.all.push({
      
      key : data.key , 
      data : data.val()
    });
  });
  firebase.database().ref('Uploaded-Files').child("FileName")
     .once('value').then(snapshot =>{
       this.FileData = snapshot.val();
  });
  
  /**initialise user names table  */
  this.userRef = firebase.database().ref('users').limitToFirst(100000);
  this.userRef.on('child_added',data =>{
       this.usersnames.push({
         key :data.key,
         data : data.val(),
         
       });
  
      this.nbusers = this.nbusers +1 ;
      
     });
     this.genaratore_color(); 
  }
  
  // FUNCTION TO REMOVE FILE FROM THE DATA BASE 
  removefile(idfile : any,fiiilname : string,userid : string){
   
  if(confirm("do you wanna remove this file ***")){
  
   var listRef = this.db.list('Uploaded-Files/'+idfile).remove();
     
   var alllistRef = this.db.list('allposts/'+idfile).remove();
  
   console.log(userid);
   var userpostsistRef = this.db.list('user-posts/'+userid+'/'+idfile).remove();
  
  let storageRef = firebase.storage().ref();
  // Create a reference to the file to delete
  var desertRef = storageRef.child(`uploads/${fiiilname}`);
  //Delete the file
  desertRef.delete().then(function() {
  // File deleted successfully
  }).catch(function(error) {
  // Uh-oh, an error occurred!
  });
  window.location.reload();
  }
  }
  
  deleteUpload(upload: Upload) {
     alert('are u sure');
     this.deleteFileData(upload.$key)
     .then( () => {
       this.deleteFileStorage(upload.name)
     })
     .catch(error => console.log(error))
   }
  
   // Deletes the file details from the realtime db
   private deleteFileData(key: string) {
    // return this.uploadTask;
  return this.db.list(`${this.basePath}/`).remove(key);
  
   }
  
   // Firebase files must have unique names in their respective storage dir
   // So the name serves as a unique key
  deleteFileStorage(name:string) {
     let storageRef = firebase.storage().ref();
     storageRef.child(`${this.basePath}/${name}`).delete()
   }
  
  
  
  view(name,idfile,authorName){

    if(this.userService.getProfile().name == authorName){
      if (name.includes(".png") ||name.includes(".jpg") || name.includes(".jpeg") ||name.includes(".tif") ){
        this.uuuup.openfileordown(name)
      }else{
        this.uuuup.viewfile(name);
      }
     
     return;
   }else{
    firebase.database().ref('/Uploaded-Files/'+idfile).child("/filestatu").once('value').then(snapshot =>{
      // console.log(snapshot.val());
    
      if(snapshot.val()=='public'){
        if (name.includes(".png") ||name.includes(".jpg") || name.includes(".jpeg") ||name.includes(".tif") ){
          this.uuuup.openfileordown(name);
         return ; 
        }
        else {
          this.downs=true;
          this.uuuup.viewfile(name);
          return;
        }
      }
     })
   }

   firebase.database().ref('/Uploaded-Files/'+idfile).child("/AllowUsers").once('value').then(snapshot =>{
    for(var i = 0 ; i<this.nbusers ; i++){
        for( var j =0 ; j <this.nbusers ; j++){
          if(this.usersnames[i].data.name == snapshot.val()[j]){
            if(this.userService.getProfile().name== this.usersnames[i].data.name){
             this.uuuup.viewfile(name);
            }else{
              var message = 'sorry you dont have acces to this file ' ; 
              this.notifier.display('error',message);

            }
          }
        }
    }
  });
  }
  
  
  
  
  
  down(name){
     this.uuuup.openfileordown(name);
  }
  
  getdoc(FileName,idfile,authorName){
  if(this.userService.getProfile().name == authorName){
   this.down(FileName);
   return;
  }
  firebase.database().ref('/Uploaded-Files/'+idfile).child("/AllowUsers").once('value').then(snapshot =>{
       for(var i = 0 ; i<this.nbusers ; i++){
           for( var j =0 ; j <this.nbusers ; j++){
             if(this.usersnames[i].data.name == snapshot.val()[j]){
               if(this.userService.getProfile().name== this.usersnames[i].data.name){
                this.down(FileName);
               }else{
                 var message = 'sorry you dont have acces to this file ' ; 
                 this.notifier.display('error',message);
               }
             }
           }
       }
     });
  }
  
  gettdoc(FileName,idfile,authorName){
  firebase.database().ref('/Uploaded-Files/'+idfile).child("/filestatu").once('value').then(snapshot =>{
   if(snapshot.val()=='public'){
     this.down(FileName);
     return ; 
   }
  
  })
  
  
   if(this.userService.getProfile().name == authorName){
     this.down(FileName);
     return;
   }
  
   firebase.database().ref('/Uploaded-Files/'+idfile).child("/AllowUsers").once('value').then(snapshot =>{
  
     
         for(var i = 0 ; i<this.nbusers ; i++){
             for( var j =0 ; j <this.nbusers ; j++){
               if(this.usersnames[i].data.name == snapshot.val()[j]){
                 if(this.userService.getProfile().name== this.usersnames[i].data.name){
                  this.down(FileName);
                 }else{
                   var message = 'sorry you dont have acces to this file ' ; 
                   this.notifier.display('error',message);
                 }
               }
             }
         }
       }); 
   }
  }
  