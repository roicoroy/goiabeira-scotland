import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ViewChild } from '@angular/core';
import { Nav, Events } from 'ionic-angular';

import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import { TranslateService } from 'ng2-translate';


@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, SplashScreen]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  name: any;
  imageUrl: any = 'assets/img/Flag-Pins-Scotland-Brazil.jpg';
  
  rootPage: string = 'HomePage';

  public uid: string;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    private events: Events,
    private translateService:TranslateService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    }); 
  }
  private useTranslateService(){
    let value= localStorage.getItem('language');
    let language = value!=null ? value:'en';
    // language=='ar'?this.platform.setDir('rtl', true):this.platform.setDir('ltr', true);;
    this.translateService.use(language);
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
       this.name=res.name!='' && res.name!=null ? res.name : 'Goiabeira App';
       this.imageUrl= res.image!='' && res.image!=null ? res.image : "assets/img/Flag-Pins-Scotland-Brazil.jpg";
      })
   }
      this.useTranslateService();
      // this.getNewsCount();
      // this.getOfferCount();
      // this.listenEvents();
  }
  album() {
    this.nav.push('AlbumPage');
  }
  home() {
    this.nav.setRoot('HomePage');
  }
  profile() {
    this.nav.setRoot('Profile');
  }
  contact(){
    this.nav.push('ContactPage')
  }
  
  login() {
    this.nav.setRoot("LoginPage");
  }

  logout() {
    this.af.auth.signOut();
    localStorage.removeItem('uid');
    this.imageUrl='assets/img/Flag-Pins-Scotland-Brazil.jpg';
    this.nav.setRoot("LoginPage");
  }

  isLoggedin() {
    return localStorage.getItem('uid') != null;
  }
  
}

