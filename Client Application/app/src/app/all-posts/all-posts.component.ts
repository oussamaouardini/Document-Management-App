import { Component, OnInit , OnDestroy} from '@angular/core';
import * as firebase from 'firebase'; 
import { MyFireService } from '../shared/myfire.service';
import { NotificationService } from '../shared/notification.service';
import { UploadService } from '../uploads/shared/upload.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from '../shared/user.service';
@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {


  
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

  constructor(private myfire:MyFireService,private notifier : NotificationService,private upp : UploadService  ,   public db: AngularFireDatabase 
    , private userService:UserService ) { }



  
    




  allRef : any ;
  loadMoreRef : any ; 
  all : any = [];
  fail = false;
  message : string;
  ngOnInit() {
this.allRef = firebase.database().ref('allposts').limitToFirst(1000000 );
this.allRef.on('child_added',data => {

  this.all.push({
    key : data.key , 
    data : data.val()
  });
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

  onfavoritesclicked(fileData){

    this.upp.handlefavoriteclicked(fileData).then(fileData=>{
      this.notifier.display('succes','image added to favorites');
    }).catch(err=>{

this.notifier.display('error','error adding image to favorites ');
    })

  }




  
down(name){
  this.upp.openfileordown(name);
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
                   this.fail=true;
                   this.message =  'sorry you dont have acces to this file ' ; 
                  // var message = 'sorry you dont have acces to this file ' ; 
                 //  this.notifier.display('error',message);
                 }
               }else{
                console.log('hello world');
                this.fail=true;
                this.message =  'sorry you dont have acces to this file ' ; 
                setTimeout(()=>{
                  this.fail=false;
                  this.message=null;
                  
                    },3000)

               }
             }
         }
       }); 
   }


 
   view(name,idfile,authorName){

    if(this.userService.getProfile().name == authorName){
      if (name.includes(".png") ||name.includes(".jpg") || name.includes(".jpeg") ||name.includes(".tif") ){
        this.upp.openfileordown(name)
      }else{
        this.upp.viewfile(name);
      }
     
     return;
   }else{
    firebase.database().ref('/Uploaded-Files/'+idfile).child("/filestatu").once('value').then(snapshot =>{
      // console.log(snapshot.val());
    
      if(snapshot.val()=='public'){
        if (name.includes(".png") ||name.includes(".jpg") || name.includes(".jpeg") ||name.includes(".tif") ){
          this.upp.openfileordown(name);
         return ; 
        }
        else {
          this.downs=true;
          this.upp.viewfile(name);
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
             this.upp.viewfile(name);
            }else{

              this.fail=true;
                   this.message =  'sorry you dont have acces to this file ' ; 
            //  var message = 'sorry you dont have acces to this file ' ; 
            //  this.notifier.display('error',message);

            }
          }else{
            console.log('hello view world');
            this.fail=true;
            this.message =  'sorry you dont have acces to this file ' ; 
            setTimeout(()=>{
              this.fail=false;
              this.message=null;
              
                },3000)
          }
        }
    }
  });
  }











}
