import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ViewChild } from '@angular/core';
import { Nav, Events } from 'ionic-angular';

import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';


@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, SplashScreen]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  name: any;
  imageUrl: any = 'assets/imgs/profile.jpg';
  
  rootPage: string = 'HomePage';

  public uid: string;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    private events: Events
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    }); 
  }
  
  openPage(page) {
    this.nav.setRoot(page.component);
  }

  ngOnInit(){
    this.uid=localStorage.getItem('uid');
    if(this.uid!=null){
     this.db.object('/users/' + this.uid)
     .valueChanges()
     .subscribe( (res:any) => {
      //  this.name=res.name;
      //  this.imageUrl= res.image!='' && res.image!=null ? res.image : "assets/imgs/profile.jpg";
      })
   }
      // this.useTranslateService();
      // this.getNewsCount();
      // this.getOfferCount();
      // this.listenEvents();
  }

  home() {
    this.nav.setRoot('HomePage');
  }
  

  login() {
    this.nav.setRoot("LoginPage");
  }

  logout() {
    this.af.auth.signOut();
    localStorage.removeItem('uid');
    this.imageUrl='assets/imgs/profile.jpg';
    this.nav.setRoot("LoginPage");
  }

  isLoggedin() {
    return localStorage.getItem('uid') != null;
  }
  
}

