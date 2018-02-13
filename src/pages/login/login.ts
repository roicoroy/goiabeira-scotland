import {Component} from '@angular/core';

import {IonicPage, NavController, LoadingController, Platform, AlertController,Events} from 'ionic-angular';

import {CustomValidators} from 'ng2-validation';

import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database'

import * as firebase from 'firebase';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    tagHide: boolean = true;
    valForm: FormGroup;

    constructor(public navCtrl: NavController,
                public fb: FormBuilder,
                public af: AngularFireAuth,
                public db: AngularFireDatabase,
                public loadingCtrl: LoadingController,
                public alertCtrl: AlertController,
                public platform: Platform,
                public events:Events
            ) {
        this.valForm = fb.group({
            'email': ['goiabeirascotland@gmail.com', Validators.compose([Validators.required, CustomValidators.email])],
            'password': ['123456', Validators.required]
        });

    }

    toggleRegister() {
        this.tagHide = this.tagHide ? false : true;
    }

    OnLogin($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            this.af.auth.signInWithEmailAndPassword(value.email, value.password).then((success) => {
                localStorage.setItem('uid', success.uid);
                this.publishEvent();
                this.navCtrl.setRoot("HomePage");
            })
                .catch((error) => {
                this.showAlert(error.message);
                });

        }
    }

  private publishEvent(){
       this.db.object('/users/' + this.af.auth.currentUser.uid)
       .valueChanges()
       .subscribe(userInfo => {
        this.events.publish('imageUrl',userInfo);
      });
    }

    showAlert(message) {
        let alert = this.alertCtrl.create({
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    Register() {
        this.navCtrl.push("RegistrationPage");
    }
    isLoggedin() {
        return localStorage.getItem('uid') != null;
      }
}
