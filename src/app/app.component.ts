import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationEnd, Router } from '@angular/router';

import { Plugins } from '@capacitor/core';
const {App} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  comID:any;
  currentRoute: any
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router :Router
  ) {
   
    this.initializeApp();

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
          this.comID=localStorage.getItem('uid');
         // console.log(this.currentRoute)
         // console.log( this.comID)
        }
      }
  );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //for app exit newton
      this.platform.backButton.subscribeWithPriority(666666,()=>{
         // if(this.constructor.name=="HomePage"){
           // if(window.confirm("Do you want to exit app ?")){
             // navigator["app"].exitApp();
           // }
         // }
         App.exitApp();
        })
    });
  }
  add(){
    this.comID=localStorage.getItem('uid');
  }
  ionViewDidLeave()
  {
    console.log("it will leave")
   // this.call=false
    this.comID=localStorage.getItem('uid');
  }
  ngOnInit() {
  }
}
