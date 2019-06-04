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
    this._msgSub = this.socket.getMessages().subscribe((message:any) => {
      let id = message['annotations']['iothub-connection-device-id'];
      this.sensors[id] = {
        fields: message.body,
        ts: message['annotations']['iothub-enqueuedtime']
      }
      console.log(this.sensors);
    });
  }

  ionViewWillLeave() {
    this._msgSub.unsubscribe();
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
