import { Component, OnInit, Input } from '@angular/core';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
import * as _ from "lodash";
import { MyFireService} from '../../shared/myfire.service';
import * as firebase from 'firebase';
import { NotificationService } from 'src/app/shared/notification.service';
import {MatButtonModule} from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
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

  constructor(private upSvc: UploadService , private myfire : MyFireService
    , private notifier : NotificationService) { }
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

    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload,this.checkedusers,this.valuestatu);

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




}
