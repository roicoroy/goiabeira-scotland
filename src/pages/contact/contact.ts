import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database'


@IonicPage()
@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
})
export class ContactPage {
    user: any = {};

    constructor(
		public af: AngularFireAuth,
		public db: AngularFireDatabase,
		public navCtrl: NavController,
		public navParams: NavParams,
	) {	

	}
    

}
