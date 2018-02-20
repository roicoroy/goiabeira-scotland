import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Newsletter } from "./newsletter.model";


@Injectable()
export class SubscribeService {
  
  

  constructor (
    
  ) {}

  doNewsletter() {
    // firebase.database().ref('subscribe/').set({
    //   email: email
    // });
  }

}
