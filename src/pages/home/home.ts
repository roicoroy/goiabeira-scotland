import {Component} from '@angular/core';
import {IonicPage, NavController, ToastController, LoadingController,Platform, Events} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';

import * as firebase from 'firebase/app';
import {AngularFireList} from 'angularfire2/database'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  

  user: any = {}
  url: any = 'assets/img/profile.jpg';
  value: any;
  loading: any;

  public file: any = {};
  public storageRef = firebase.storage();

  public ComingData: Array<any> = [];
  public Categories: Array<any> = [];
  comingData: AngularFireList<any>;
  categories: AngularFireList<any>;
  
  constructor(
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public platform:Platform,
    
    public events: Events
  ) {
    
    
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
  });
  loader.present().then(() => {
      this.comingData = db.list('/coming');
      this.categories = db.list('/categories');
      this.comingData.valueChanges().subscribe((data) => {
          this.ComingData = data;
      });
      this.categories.snapshotChanges().subscribe((data) => {
          this.Categories =[];
          data.forEach(item=>{
              let temp = item.payload.toJSON();
              temp['$key'] = item.payload.key;
              this.Categories.push(temp);
          })
          loader.dismiss();
      })
  });
  

    
}

  navigate(id) {
    this.navCtrl.push("ProductListPage", {id: id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  ngOnInit(){
    if (this.af.auth.currentUser) {
             this.db.object('/users/' + this.af.auth.currentUser.uid).valueChanges().subscribe((res:any) => {
                 this.user = res;
                 this.user.image = res.image ? res.image : '';
                 this.url= res.image ? res.image : "assets/img/profile.jpg";
             })
         } 
 }
  isLoggedin() {
    return localStorage.getItem('uid') != null;
  }
  
}
