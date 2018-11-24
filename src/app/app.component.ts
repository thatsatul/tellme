import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CommonService } from './services/common.service';
import { HttpClient } from '@angular/common/http';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification/ngx';



export class MyPage {
  constructor() { }
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private watchID;
  private notifications;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private geolocation: Geolocation,
    private commonService: CommonService,
    private http: HttpClient,
    private localNotification: PhonegapLocalNotification
  ) {
    this.initializeApp();
  }

  ngOnInit() {

    if(!!navigator.geolocation) {
      // Support
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Initial Position", position);
          this.commonService.position = position;
          position && this.subscribeItemNotifications();
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
          position && this.subscribeItemNotifications();
        },
        (error) => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    } else {
        this.commonService.alert({message: "Please enable geolocation to use this app"});
    }
  }

  subscribeItemNotifications() {
    this.http.post(
      "http://10.91.1.84:5000/api/getnotification",
      {
        userid: this.commonService.userId,
        lat: this.commonService.position.latitude,
        lng: this.commonService.position.longitude,
      },
      this.commonService.httpOptions
    ).subscribe((res: any) => {
      this.notifications = res;
      const toShowData = this.notifications.places[0] || {};
      if (!toShowData.name){
        return;
      }
      this.localNotification.requestPermission().then(
        (permission) => {
          console.log('permission', permission);
          if (permission === 'granted') {
            // Create the notification
            this.localNotification.create('Recommended for you', {
              tag: toShowData.name,
              body: 'Nearest visit for you as per your preference',
              icon: toShowData.icon
            });
          }
        }
      );
    });
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
