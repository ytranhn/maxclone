import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../helpers/_modal/modal/modal.service';
import { UserService } from '../../services/user.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-apires',
  templateUrl: './apires.component.html',
  styleUrls: ['./apires.component.css']
})
export class ApiresComponent implements OnInit {

  flat: number = 0;
  valueAPI: any;
  constructor(private modalService: ModalService,private userSvc: UserService, private sanitized: DomSanitizer) { }

  ngOnInit(): void {
  }

  openModal(id: string) {
    this.modalService.open(id);
    if(localStorage.getItem('AccessToken') != null){
      this.flat = 1;
    }
    this.userSvc.getApiRes(this.flat).subscribe((x: any) => {
      if(x){
        if(x.Code == 0){
          this.valueAPI = this.sanitized.bypassSecurityTrustHtml(x.Data);
        }
      }
    })
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
