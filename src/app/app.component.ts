import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// import { SpeechRecognition } from '@ionic-native/speech-recognition';

export class MyPage {

  constructor() { }

  
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
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

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // Check feature available

}
