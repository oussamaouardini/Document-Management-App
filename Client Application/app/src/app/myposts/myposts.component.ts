import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MyFireService } from '../shared/myfire.service';
import { NotificationService } from '../shared/notification.service';
import * as firebase from 'firebase';


//import * as firebase from 'firebase';
import { UploadService } from 'src/app/uploads/shared/upload.service';
import { Upload } from '../uploads/shared/upload';
import {AngularFireDatabase, snapshotChanges} from 'angularfire2/database';
import { PdfJsViewerModule, PdfJsViewerComponent } from 'ng2-pdfjs-viewer';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { String } from 'core-js';
//import { MyFireService } from '../myfire.service';
import { UserService } from '../shared/user.service';
//import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.scss']
})
export class MypostsComponent implements OnInit {
  miseaj : boolean = false ; 
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
tabdejaime : any = [];

 constructor( private uuuup : UploadService  , public db: AngularFireDatabase , public myfire : MyFireService ,private userService:UserService,
   private notifier : NotificationService) { }

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

   funlovefunlove(name,Ccreationdate,ffileid,ddescription,uuserid,vaaluestatu,autthorName,eemail,AallowUsers,ffilestatu){
 
    let icon = document.querySelectorAll('i');
    for(let i = 0; i < icon.length; i++){
      var  currentuser:any = this.userService.getProfile().uid;
      icon[i].ondblclick = function(){
        var liking : any = [];
       

        firebase.database().ref('/Uploaded-Files/'+ffileid).child('/likedby').once('value').then(snapshot =>{
          if(snapshot.val()==null){
          }else{
            liking= snapshot.val();
          }
        })
        icon[i].classList.toggle("red");
        var likefile = firebase.database().ref('/Uploaded-Files/'+ffileid).child("liked").once('value').then(snapshot =>{
          if(snapshot.val()==true){
var index =0 ; 
            liking.forEach(element => {
              console.log(index)
              if(element == currentuser){
                exist = true;
               return;
              }
              index++;
            });
            if(exist){
              delete liking[index];
            }
            
            var postData = {
              FileName:name,
              authorName: autthorName,
              uid: uuserid,
              favoritecount:'0',
              filestatu:ffilestatu,
              description : ddescription,
              email:eemail,
              Creationdate :Ccreationdate ,
              idfile : ffileid,
              liked:!snapshot.val(),
              likedby: liking
            };
  
            firebase.database().ref('/Uploaded-Files/'+ffileid).update(postData);  

          }else{




            console.log(snapshot.val());
         var exist : boolean = false ; 
        liking.forEach(element => {
          if(element == currentuser){
            exist = true;
           return;
          }
        });
        if(exist){
          var postData = {
            FileName:name,
            authorName: autthorName,
            uid: uuserid,
            favoritecount:'0',
            filestatu:ffilestatu,
            description : ddescription,
            email:eemail,
            Creationdate :Ccreationdate ,
            idfile : ffileid,
            liked:!snapshot.val(),
            likedby: liking
          };

          firebase.database().ref('/Uploaded-Files/'+ffileid).update(postData);  

          return;
        }else{
          liking.push(currentuser);
        }
          var postData = {
            FileName:name,
            authorName: autthorName,
            uid: uuserid,
            favoritecount:'0',
            filestatu:ffilestatu,
            description : ddescription,
            email:eemail,
            Creationdate :Ccreationdate ,
            idfile : ffileid,
            liked:!snapshot.val(),
            likedby: liking
          };

          firebase.database().ref('/Uploaded-Files/'+ffileid).update(postData);   



          }
                 
         });
      }
    }
    return name;
    

/*    let icon = document.querySelectorAll('i');
    for(let i = 0; i < icon.length; i++){

      icon[i].ondblclick = function(){
        icon[i].classList.toggle("red");
        var likefile = firebase.database().ref('/Uploaded-Files/'+ffileid).child("liked").once('value').then(snapshot =>{
  
          var postData = {
            FileName:name,
            authorName: autthorName,
            uid: uuserid,
            favoritecount:'0',
            filestatu:ffilestatu,
            description : ddescription,
            email:eemail,
            Creationdate :Ccreationdate ,
            idfile : ffileid,
            liked:!snapshot.val()
          };

          firebase.database().ref('/Uploaded-Files/'+ffileid).update(postData);          
         });
      }
    }
    return name;*/
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
   
   
   this.favref = firebase.database().ref('Uploaded-Files').limitToFirst(1000);
  this.favref.on('child_added',data=>{
   
    firebase.database().ref('/Uploaded-Files/').child(data.key).once('value').then(snapshot =>{
      if(snapshot.val().liked ==true ||snapshot.val().liked ===true ){
        var j ;
        for( j=0;j <this.nbfile;j++){
          if(this.all[j].key == data.key){
            let icon = document.querySelectorAll('i');
          icon[j].setAttribute("class","fa fa-heart fa-2x red ");

          
        this.favposts.push({
          key:data.key,
          data:data.val(),
               });
          }         
          }
      }
      else {
        for( j=0;j <this.nbfile;j++){
          if(this.all[j].key ){}
        }
      }



 });
  });
}

// FUNCTION TO REMOVE FILE FROM THE DATA BASE 
removefile(idfile : any,fiiilname : string,userid : string){
 
if(confirm("do you wanna remove this file ***")){
 var listRef = this.db.list('Uploaded-Files/'+idfile).remove(); 
 var alllistRef = this.db.list('allposts/'+idfile).remove();
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
