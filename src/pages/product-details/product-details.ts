import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database'



@IonicPage()
@Component({
    selector: 'page-product-details',
    templateUrl: 'product-details.html'
})
export class ProductDetailsPage {
    user: any = {}
    url: any = 'assets/img/profile.jpg';
    
    FireVisible = false;
    id: any;

    orderId: any;
    index: '';
    productDetails: any = {
        item: {review: ''}
    };
    
    public menuItems: any = {};
   
    noOfItems: any;
    public selectedItems: Array<any> = [];
    menuItem: AngularFireObject<any>;

    constructor(public navCtrl: NavController,
                public af: AngularFireAuth,
                public db: AngularFireDatabase,
                public navParams: NavParams,
                
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController) {

        this.id = this.navParams.get('id');
        this.menuItem = db.object('/menuItems/' + this.id)

        this.menuItem.valueChanges().subscribe((data:any) => {
            if(data != null){
                this.menuItems = data;
                this.menuItems['$key'] =this.id;
            }
            
        })
    }

    call(){
        this.navCtrl.push("HomePage");
    }
    // rate(itemId) {
    //     this.navCtrl.push("RatingPage", {
    //         orderId: this.orderId,
    //         index: this.index,
    //         itemId: itemId,

    //     })
    // }

    ionViewWillEnter(){

    }

    home() {
        this.navCtrl.push("HomePage");
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
