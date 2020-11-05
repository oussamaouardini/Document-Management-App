import { Component, OnInit , OnDestroy} from '@angular/core';
import * as firebase from 'firebase'; 
import { MyFireService } from '../shared/myfire.service';
import { NotificationService } from '../shared/notification.service';
import { UploadService } from '../uploads/shared/upload.service';
import { Upload } from '../uploads/shared/upload';
import { UserService } from '../shared/user.service';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {


  nbcol=1;

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

  constructor(private upSvc: UploadService , private myfire : MyFireService
    , private notifier : NotificationService,private userService:UserService  , public db: AngularFireDatabase ) { }
  allRef : any ;
  loadMoreRef : any ; 
  all : any = [];
  //private uuuup : UploadService  
  isLoggedIn = false
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
this.allRef = firebase.database().ref('allposts').limitToFirst(20000);
this.allRef.on('child_added',data => {

  this.all.push({
    key : data.key , 
    data : data.val()
  });
});



this.genaratore_color();





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
  onLoadMore(){
    

    if(this.all.length >0){
      const lastLoadedPostt = this.all[this.all.length-1];
      const lastLoadedPostkey = lastLoadedPostt.key ; 

      this.loadMoreRef = firebase.database().ref('allposts').startAt(null , lastLoadedPostkey).limitToFirst(3+1)
      this.loadMoreRef.on('child_added',data => {

        if(data.key === lastLoadedPostkey){
          return ;
        } else {
          this.all.push ({
            key : data.key , 
            data : data.val()
          });
        }
      });
    }
  }

  ngOnDestroy() {
  this.allRef.off();

  }

  

  downs= false ; 

  
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







  selectedFiles: FileList;

  bbtn=false;
 
  update = true ; 
  basePath:string = '/uploads';
 
  selectedstatu :boolean = false;
  currentUpload: Upload;
  expression = false;

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













}
