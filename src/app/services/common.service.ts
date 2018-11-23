import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class CommonService {

	constructor(private alertController: AlertController) {
	}

	async alert(alertObj) {
    const alert = await this.alertController.create({
      header: alertObj.header || 'Alert',
      subHeader: alertObj.subHeader || null,
      message: alertObj.message,
      buttons: ['OK']
    });

    await alert.present();
  }

}