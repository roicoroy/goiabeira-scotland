import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-album',
  templateUrl: 'album.html',
})
export class AlbumPage {
  @ViewChild('slider') slider: Slides;

  slides = [
    {
      imageUrl: 'assets/img/album/album_1.jpg',
    },
    // {
    //   imageUrl: 'assets/img/album/label.png',
    // },
    // {
    //   title: 'Can\'t believe, that\'s true!',
    //   imageUrl: 'assets/img/album/album_3.jpg',
    // },
    // {
    // title: 'Try NOW!',
    //   imageUrl: 'assets/img/album/album_4.jpg',
    // },
    {
      title: 'Try NOW!',
      imageUrl: 'assets/img/album/album_5.jpg',
    },
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumPage');
  }

}
