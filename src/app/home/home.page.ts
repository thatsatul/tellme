import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  itemModel: string = null;
  userList: Array<string> = [];
  loading = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private speechRecognition: SpeechRecognition,
    private commonService: CommonService,
    private backgroundMode: BackgroundMode
  ) {

  }

  ngOnInit() {
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {

      if (!hasPermission) {
      this.speechRecognition.requestPermission()
        .then(
          () => console.log('Granted'),
          () => console.log('Denied')
        )
      }
    });

    this.getUserList();
  }

  getUserList() {
    this.http.post("http://10.91.1.84:5000/api/getwishlist?userid=" + this.commonService.userId, {}, this.commonService.httpOptions)
    .subscribe((res: any) => {
        this.userList = res.data;
    });
  }

  startSpeechReception() {
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          const speakVal = matches[0];
          let st;
          if(speakVal) {
            this.saveItem(speakVal);
            // st = setTimeout(() => {
            //   this.userList.push(speakVal);
            //   st.clearTimeout();
            // }, 300);
            console.log(this.userList);
          }
        },
        (onerror) => console.log('error:', onerror)
      )
  }

  addInputItem() {
    if(!this.itemModel) {
      return;
    }
    this.saveItem(this.itemModel);
  }

  deleteItem(item) {
    this.saveItem(item.itemName, false);
  }

  saveItem(item, add?) {

    const postBody = {userid: this.commonService.userId, itemName: item, isDone: add == false};
    this.http.post("http://10.91.1.84:5000/api/saveitem", postBody, this.commonService.httpOptions)
    .subscribe((res: any) => {
        this.userList = res.data;
        console.log(this.userList);
        this.itemModel = null;
    });
  }

  goToBackground() {
    this.backgroundMode.enable();
  }

  goToItemPage(item) {
    this.commonService.selectedItem = item;
    this.router.navigate(['/item-page']);
  }

  mimicstartSpeechReception() {
    this.saveItem('Test Item');
  }
}
