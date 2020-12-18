import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ModalService } from '../../helpers/_modal/modal/modal.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.less']
})
export class StockComponent implements OnInit {

  public href: string = "";
  isShow: boolean = true;
  items: Array<any>;
  loading: any;
  listData: Array<any>;
  notification: any;
  dataPurchased: any;
  flatData: any = true;
  fakeCode: string;
  constructor(
    private router: Router,
    private userSvc: UserService,
    private modalService: ModalService,
    private dashboard: DashboardComponent) {}

  ngOnInit(){
    this.checkUrl();
    this.getStock();
    this.reloadItemStock();
  }

  checkUrl(){
    const flat = localStorage.getItem('AccessToken');
    if(!flat){
      this.isShow = false;
    }
  }

  getStock(){
    this.userSvc.getStock().subscribe((result: any) => {
      if(result){
        if(result.Code == 0){
          this.items = result.Data;
        }
      }    
    });
  }

  async reloadItemStock(){
    this.removeReloadItemStock();
    this.loading = await setInterval(() => {
      this.getStock();
    }, 10000);
  }

  removeReloadItemStock() {
    clearInterval(this.loading);
  }

  // check buy
  openModal(id: string) {
    this.removeReloadItemStock();
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.reloadItemStock();
  }

  // open Modal Stock
  openModalStock(id: string, code) {
    this.removeReloadItemStock();
    this.modalService.open(id);
    this.isShow = false;
    this.fakeCode = code;
  }

  closeModalStock(id: string) {
    this.modalService.close(id);
    this.isShow = true;
    this.reloadItemStock();
  }

  //close Model Success
  closeModalSuccess(id: string) {
    this.modalService.close(id);
    this.reloadItemStock();
    this.isShow = true;
  }

  //buy Stock
  buyStock(value){
    if(value > 0){
      this.openModal('set-loading');
      this.closeModal('buy-stock');
      var data = {
        'CloneType': this.fakeCode,
        'Quantity': value
      };
      const stringifiedData = JSON.stringify(data);
      const parsedJson = JSON.parse(stringifiedData);
      this.userSvc.buyStock(parsedJson).then((data:any)=>{
        if(data){
          this.closeModal('set-loading');
          if(data.Code == 0){
            this.dashboard.getUser();
            this.dashboard.getTrans();
            this.listData = data.Data;
            this.notification = data.Message;
            this.flatData = JSON.stringify(data.Data);
            const flatParse = JSON.parse(this.flatData);
            this.dataPurchased = flatParse;
            this.openModal('success-buy-stock');
          }else{
            this.openModal('fail-buy-stock');
            this.notification = data.Message;
            this.isShow =true;
          }
        }
      })
    }
  }

  // Download

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  dynamicDownloadTxt() {
    this.dyanmicDownloadByHtmlTag({
      fileName: 'MaxClone-data-txt',
      text: JSON.parse(this.flatData)
    });
  }

  dynamicDownloadJson() {
    this.dyanmicDownloadByHtmlTag({
      fileName: 'MaxClone-data-parse.json',
      text: JSON.parse(this.flatData)
    });
  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }
}
