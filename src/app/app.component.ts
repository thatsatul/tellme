import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CommonService } from './services/common.service';
import { HttpClient } from '@angular/common/http';


export class MyPage {

  constructor() { }
  
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private watchID;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private geolocation: Geolocation,
    private commonService: CommonService,
    private http: HttpClient
  ) {
    this.initializeApp();
  }

  ngOnInit() {

    if(!!navigator.geolocation) {
      // Support
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Initial Position", position);
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
      this.watchID = navigator.geolocation.watchPosition(
        (position) => {
          console.log("Component last position", position);
          this.commonService.position = position;
        },
        (error) => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    } else {
        this.commonService.alert({message: "Please enable geolocation to use this app"});
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnDestroy() {
    this.watchID.unsubscribe();
  }
  // Check feature available
}
