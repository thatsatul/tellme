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
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 2000 },
      );
      this.watchID = navigator.geolocation.watchPosition(
        (position) => {
          console.log("Component last position", position);
          this.commonService.position = position;
          position && this.subscribeItemNotifications();
        },
        (error) => alert(error.message),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 2000 },
      );
    } else {
        this.commonService.alert({message: "Please enable geolocation to use this app"});
    }
  }

  subscribeItemNotifications() {
    console.log(this.commonService.position);
    this.http.post(
      "http://10.91.1.84:5000/api/getnotification",
      {
        userid: this.commonService.userId,
        lat: this.commonService.position.coords.latitude,
        lng: this.commonService.position.coords.longitude,
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
            this.localNotification.create(toShowData.name, {
              tag: toShowData.name,
              body: 'Recommended as per your preference',
              icon: toShowData.icon
            });
          }
        }
      );
      // this.commonService.notificationOn = false;
      // this.commonService.alert({
      //   header: toShowData.name,
      //   message: 'Recommended as per your preference',
      // });
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
