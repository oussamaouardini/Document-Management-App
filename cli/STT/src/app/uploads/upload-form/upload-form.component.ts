import { Component, OnInit, Input } from '@angular/core';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
import * as _ from "lodash";
import { MyFireService} from '../../shared/myfire.service';
import * as firebase from 'firebase';
import { NotificationService } from 'src/app/shared/notification.service';
import {MatButtonModule} from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { UserService } from 'src/app/shared/user.service';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})

export class UploadFormComponent implements OnInit {

 
  







  genarator_color(){
    console.log("generator");
    var col = document.querySelectorAll('section');
    console.log(col.length);
    for(var i = 0 ; i<col.length;i++){
      console.log(col[i]);
    }
  }

  

  @Input() idfile;

  bbtn=false;
  update = true ; 
  basePath:string = '/uploads';
  selectedFiles: FileList;
  selectedstatu :boolean = false;
  currentUpload: Upload;
  expression = true;
  psswd:string;
nnm:string;
mmiil:string;
iiiid:string;
filidm:string;
filime:string;
filauth:string;

  constructor(private upSvc: UploadService , private myfire : MyFireService
    , private notifier : NotificationService  , public db: AngularFireDatabase , private userService:UserService ) { }


  


    downs= false ; 

    status = false; 
  checkedusers : any = [];
  usersnames : any = [];
  nbusers = 1  ; 
  userRef : any ; 
  postLists : any = [];
  checkeduser : any ; 
  PersonalPostsRef : any ;
  userid : any ;
  valuestatu : any ; 


/**  new new */




ngOnInit(){

//INITIALISE  POSTS LIST ARRAY  
    this.expression = false;
    const uid = firebase.auth().currentUser.uid;

    this.PersonalPostsRef = this.myfire.getuserpostref(uid);
    this.PersonalPostsRef.on('child_added',data =>{

      this.postLists.push({
        key: data.key,
        data : data.val()
      })
    });
this.userid = firebase.auth().currentUser.uid;
    
/**initialise user names table  */

    this.userRef = firebase.database().ref('users').limitToFirst(100000);
    this.userRef.on('child_added',data =>{
      this.usersnames.push({
        key :data.key,
        data : data.val()
      });
     this.nbusers = this.nbusers +1 ;
    });
   // this.genarator_color();
}

detectFiles(event) {
      this.selectedFiles = event.target.files;
}

// FUCTION OF UPLOAD SINGLE 
uploadSingle() {
var des ; 
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload,this.checkedusers,this.valuestatu,des);

}
bbttn(){
this.bbtn=true;
  
}

statuu(input: HTMLInputElement){
if(input.checked === true)
{
  if(input.value == 'private')
  {
    this.expression = true;
    this.selectedstatu = true ; 
  }
  else if(input.value == 'public')
  {
    this.expression = false ; 
    this.selectedstatu = true ; 
  }
}else{
  this.selectedstatu = false; 
}
this.valuestatu = input.value;
return (input.value);
  
}


// FUNCTIN TO SHOW USERS TO GIVE ACCESS 
handle() {
//this.expression = true;
this.status = true;
}

// FUNCTION TO SELECT USERS WHO CAN SEES THE FILES 
selectionChange(input: HTMLInputElement){

    if((input.checked === false)){

for(var i = 0 ;i<this.nbusers ; i++){

  if(this.checkedusers[i]=== input.value){
    delete this.checkedusers[i];
  }
}
}

if(input.checked === true){
this.checkedusers.push(input.value);
}  
}

// FUCTION OF UPLOAD MULTIPLE
/*
uploadMulti() {
    let files = this.selectedFiles
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.upSvc.pushUpload(this.currentUpload,this.checkedusers,this.valuestatu);
    
    }
    )
    this.notifier.display('success','File Uploaded Successfully!!');
}
*/

down(name){
  this.upSvc.openfileordown(name);
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


 
   view(name,idfile,authorName){

    if(this.userService.getProfile().name == authorName){
      if (name.includes(".png") ||name.includes(".jpg") || name.includes(".jpeg") ||name.includes(".tif") ){
        this.upSvc.openfileordown(name)
      }else{
        this.upSvc.viewfile(name);
      }
     
     return;
   }else{
    firebase.database().ref('/Uploaded-Files/'+idfile).child("/filestatu").once('value').then(snapshot =>{
      // console.log(snapshot.val());
    
      if(snapshot.val()=='public'){
        if (name.includes(".png") ||name.includes(".jpg") || name.includes(".jpeg") ||name.includes(".tif") ){
          this.upSvc.openfileordown(name);
         return ; 
        }
        else {
          this.downs=true;
          this.upSvc.viewfile(name);
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
             this.upSvc.viewfile(name);
            }else{
              var message = 'sorry you dont have acces to this file ' ; 
              this.notifier.display('error',message);

            }
          }
        }
    }
  });
  }


/** */

divv_show() {
  document.getElementById('abc').style.display = "block";
}
div_hide() {
  document.getElementById('abc').style.display = "none";
}


nn :any ;
ath : any ;
iden:any;
dt:any;
iddddd : any ;
des : any;

div_show(name,author,uid,creation,fff,description) {
  (document.getElementById('description') as HTMLInputElement).value =description;
  this.iiiid = fff;
  this.nn =name ;
  this.ath = author;
  this.iden=uid,
  this.dt = creation;
  this.des=description;
document.getElementById('abc').style.display = "block";


}



change(){
  var id = this.iiiid;
  var auth = this.ath;
  var smiya = this.nn;
  var fic = this.iden;

  var up_description = (document.getElementById('description') as HTMLInputElement).value;
  
  var upda =  firebase.database().ref("/Uploaded-Files/"+id).once('value').then(snapshot =>{


    var postData = {
      FileName:smiya,
      authorName: auth,
      uid: fic,
     
      
      description :up_description ,
    
    };
    firebase.database().ref('/Uploaded-Files/'+id).update(postData);
    firebase.database().ref('/allposts/'+id).update(postData);
    firebase.database().ref('/user-posts/'+ fic+'/'+id).update(postData);


});
this.div_hide();
window.location.reload();
}



  /* */

  delet_show(idf,filn,usrid) {
    document.getElementById('delet').style.display = "block";
  this.filidm = idf;
   this.filime=filn;
   this.filauth= usrid;
   
   
    }

    delet_hide(){
      document.getElementById('delet').style.display = "none";
      }



    yesconfirm(){
      var id = this.filidm;
              var listRef = this.db.list('Uploaded-Files/'+id).remove();
              var listRef = this.db.list('allposts/'+id).remove();
            }

    statu(input: HTMLInputElement){

      console.log("hello wolrd",this.mmiil,this.iiiid,this.iiiid)
 
      if(input.checked === true)
      {
       
        if(input.value == 'yes')
        {
          this.yesconfirm();
          this.delet_hide();
          window.location.reload();
        }

        else 
        {
         this.delet_hide()
        }
      }
    
}



  removefile(idfile : any,fiiilname : string,userid : string){
    
this.delet_show(idfile,fiiilname,userid);

this.db.list('user-posts/'+userid+'/'+idfile).remove();

//var listRef = this.db.list('Uploaded-Files/'+idfile).remove();



   /*
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

    */
    }


}
