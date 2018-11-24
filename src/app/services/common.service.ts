import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CommonService {

  isDevice = true;
  userId: string = null;
  position: any = null;
  notificationOn = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  selectedItem = null;

	constructor(private alertController: AlertController) {
    this.userId = "dipali";
	}

	async alert(alertObj) {
    // if(this.notificationOn) {
    //   return;
    //   this.notificationOn = false;
    // }
    const alert = await this.alertController.create({
      header: alertObj.header || 'Alert',
      subHeader: alertObj.subHeader || null,
      message: alertObj.message,
      buttons: ['OK']
    });

    await alert.present();
  }

}