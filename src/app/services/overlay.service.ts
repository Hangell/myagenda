import { Injectable } from '@angular/core';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  ToastController,
  ToastOptions
} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  async alert(options?: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create(options);
    await alert.present();
    return alert;
  }

  async loading(options?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      ...options    //spreadOperator Sobrescreeve default
    });
    await loading.present();
    return loading;
  }

  async toast(options?: ToastOptions): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      duration: 3000,
      position: 'top',
      message: '',
      ...options
    });
    await toast.present();
    return toast;
  }
}
