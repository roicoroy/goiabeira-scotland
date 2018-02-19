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
    count: any = 1;
    resFevrt: any = {};

    public menuItems: any = {};
    public cart = {
        itemId: String,
        extraOptions: [],
        price: {
            name: "",
            value: Number,
            currency: ''
        },
        title: '',
        thumb: String,
        itemQunatity: this.count
    };
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
                this.cart.title = data.title;
                this.cart.itemId = this.id;
                this.cart.thumb = data.thumb;
            }
            if (this.af.auth.currentUser) {
                this.db.object('/users/' + this.af.auth.currentUser.uid + '/favourite/' + this.id).valueChanges().subscribe((res:any) => {
                    if(res != null){
                        this.resFevrt = res;
                    } 
                })
            }
        })
    }

    call(){
        
    }

    ionViewWillEnter(){
    //   let cart: Array<any> = JSON.parse(localStorage.getItem('Cart'));
    //   this.noOfItems=cart!=null ? cart.length : null;
    }

    addQuantity() {
        if (this.count < 10) {
            this.count = this.count + 1;
            this.cart.itemQunatity = this.count;
        }
    }

    removeQuantity() {
        if (this.count > 1) {
            this.count = this.count - 1
            this.cart.itemQunatity = this.count;
        }
    }



    home() {
        this.navCtrl.push("HomePage");
    }

    sizeOptions(price) {
        this.cart.price = price;
    }


    checkOptions(extraOption) {
        if (this.cart.extraOptions.length != 0) {
            for (var i = 0; i <= this.cart.extraOptions.length - 1; i++) {
                if (this.cart.extraOptions[i].name == extraOption.name) {
                    this.cart.extraOptions.splice(i, 1);
                    break;
                }
                else {
                    this.cart.extraOptions.push(extraOption);
                    break;
                }
            }
        }
        else {
            this.cart.extraOptions.push(extraOption);
        }
    }


  

    visible = false;


    addToFevrt(key) {
        if (this.af.auth.currentUser) {
            this.db.object('/users/' + this.af.auth.currentUser.uid + '/favourite/' + key).update({
                thumb: this.menuItems.thumb,
                title: this.menuItems.title,
                description: this.menuItems.description

            }).then(res => {
                this.createToaster('added to favourites', '3000');
            });
        }
        else {
            this.createToaster('please login ', '3000');
        }
    }

    removeFevrt(key) {
        if (this.af.auth.currentUser) {
            this.db.object('/users/' + this.af.auth.currentUser.uid + '/favourite/' + key).remove();
            this.createToaster('removed from favourites', '3000');
        }
    }

    createToaster(message, duration) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
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
