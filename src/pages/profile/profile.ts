import {Component} from '@angular/core';
import {IonicPage, NavController, ToastController, LoadingController,Platform, Events} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {TranslateService} from 'ng2-translate';
import * as firebase from 'firebase/app';
import { delay } from 'rxjs/operators';


@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class Profile {
    user: any = {}
    url: any = 'assets/img/profile.jpg';
    value: any;
    options = [
        {
            "language": "ENGLISH",
            "value": "en"
        },
        {
            "language": "PORTUGUESE",
            "value": "pt"
        }        
    ];
    public file: any = {};
    public storageRef = firebase.storage();

    constructor(public af: AngularFireAuth,
                public db: AngularFireDatabase,
                public toastCtrl: ToastController,
                public loadingCtrl: LoadingController,
                public navCtrl: NavController,
                public platform:Platform,
                public translate: TranslateService,
                public events: Events) {

            let value= localStorage.getItem('language');
            this.value = value!=null ? value:'en';
            this.translate.setDefaultLang('en');
            
    }
    isLoggedin() {
        return localStorage.getItem('uid') != null;
      }

    ngOnInit(){
       if (this.af.auth.currentUser) {
                this.db.object('/users/' + this.af.auth.currentUser.uid)
                .valueChanges()
                .subscribe((res:any) => {
                    this.user = res;
                    this.user.image = res.image ? res.image : '';
                    this.url= res.image ? res.image : "assets/img/profile.jpg";
                })
            } 
    }

    readUrl(event) {
        this.file = (<HTMLInputElement>document.getElementById('file')).files[0];
        let metadata = {
            contentType: 'image/*'
        };
        let loader = this.loadingCtrl.create({
            content: 'please wait..'
        })
        loader.present();
        this.storageRef.ref().child('profile/' + this.file.name).put(this.file, metadata)
            .then(res => {
                this.user.image = res.downloadURL;
                this.url = res.downloadURL;
                this.db.object('users'+'/'+this.af.auth.currentUser.uid+'/image')
                .set(res.downloadURL);
                loader.dismiss();
             }).catch(error => {
                loader.dismiss();
            });

    }

    changeLanguage() {
        localStorage.setItem('language',this.value);
        if (this.value == 'pt') {
            // this.platform.setDir('ltr', true);
            this.translate.use('pt');
        }
        else {
            // this.platform.setDir('ltr', true);
            this.translate.use('en');
        }
        
    }

    onSubmit(user: NgForm) {

        if (this.af.auth.currentUser) {
            this.db.object('/users/' + this.af.auth.currentUser.uid).update({
                name: this.user.name,
                image: this.user.image,
                email: this.user.email,
                // mobileNo: this.user.mobileNo
            }).then(() => {
                this.createToaster("user information updated successfully", 1000);
                this.events.publish('imageUrl',this.user);
            }).then(() =>{
                // delay:3000;
                this.navCtrl.push('HomePage')
            })
        }
    }

    createToaster(message, duration) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
    }

}

