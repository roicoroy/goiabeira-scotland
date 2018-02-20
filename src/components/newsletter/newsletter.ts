import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Newsletter } from './newsletter.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SubscribeService } from './subscribe.service';


@Component({
  selector: 'newsletter',
  templateUrl: 'newsletter.html'
})
export class NewsletterComponent {

  text: string;
  newsletter = {} as Newsletter;  

  constructor(
      private afAuth: AngularFireAuth,
      public navCtrl: NavController, 
      public navParams: NavParams,
      public http: HttpClient,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      public subscirbeService:SubscribeService
  ) {
    // console.log('Hello NewsletterComponent Component');
    this.text = 'Newsletter';
  }
  // doNewsletter() {
  //     console.log('Hello NewsletterComponent Component');
  // }
  onPress(form: NgForm) {
    // this.subscirbeService.doNewsletter(form.value.email)
        // console.log('Hello Component');
  }

}
