import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CommonService } from './services/common.service';

export class MyPage {

  constructor() { }
  
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private watch;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private geolocation: Geolocation,
    private commonService: CommonService,
    // private speechRecognition: SpeechRecognition
  ) {
    this.initializeApp();
  }

  ngOnInit() {

    // this.speechRecognition.hasPermission()
    //   .then((hasPermission: boolean) => {

    //     if (!hasPermission) {
    //     this.speechRecognition.requestPermission()
    //       .then(
    //         () => console.log('Granted'),
    //         () => console.log('Denied')
    //       )
    //     }

    //  });
    
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
     }).catch((error) => {
        this.commonService.alert({message: 'Geolocation permission not available'});
     });
     
     this.watch = this.geolocation.watchPosition();
     this.watch.subscribe((data) => {
      console.log(data);
     });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnDestroy() {
    this.watch.unsubscribe();
  }
  // Check feature available
}
