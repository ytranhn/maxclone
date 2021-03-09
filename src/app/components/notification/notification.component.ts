import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notification: string;
  loading: any;
  constructor(private userSvc: UserService) {
    this.getNoti();
  }

  ngOnInit(): void {
    this.reloadItem();
  }

  getNoti(){
    this.removeReloadItem();
    this.userSvc.getNoti().subscribe((x: any) => {
      if(x){
        if(x.Code == 0){
          this.notification = x.Data;
        }
      }
    })
  }

  reloadItem(){
    this.removeReloadItem();
    this.loading = setInterval(() => {
      this.getNoti();
    }, 60000);
  }

  removeReloadItem() {
    clearInterval(this.loading);
  }
}
