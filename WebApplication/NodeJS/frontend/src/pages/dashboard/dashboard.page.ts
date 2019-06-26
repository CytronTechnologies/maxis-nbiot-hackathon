import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subscription } from "rxjs";
import { SocketioService } from "../../services/socketio.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage {

  sensors = {};
  private _msgSub: Subscription;

  constructor(
    private socket: SocketioService,  
    private toastCtrl: ToastController) {
  
  }

ionViewWillEnter() {
    this._msgSub = this.socket.getMessages().subscribe(async(message:any) => {
      let id = message['annotations']['iothub-connection-device-id'];
      this.sensors[id] = {
        fields: message.body,
        ts: message['annotations']['iothub-enqueuedtime']
      }
      if(message.applicationProperties.temperatureAlert == "true") {
        await this.showToast(`Alert from ${id}! Temperature has exceeded 30°C. Current value is ${message.body.temperature} °C`)
      }
    });
  }

  ionViewWillLeave() {
    this._msgSub.unsubscribe();
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
      showCloseButton: true
    });
    return toast.present();
  }

}
