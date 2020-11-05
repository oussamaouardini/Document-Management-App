import { CanActivate} from '@angular/router';
import * as firebase from 'firebase';
import { from } from 'rxjs';


export class RouteGuard implements CanActivate {
canActivate(){

    if(firebase.auth().currentUser)
    {
        return true;
    }else 
    return false ;
}

}