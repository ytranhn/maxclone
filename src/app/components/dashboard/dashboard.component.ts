import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { ModalService } from '../../helpers/_modal/modal/modal.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.less"],
})
export class DashboardComponent implements OnInit {

  public userInfo: any;
  public fullTrans: any;
  pageOfItems: Array<any>;
  p: number = 1;
  isShow: boolean = true;
  loading: any;
  detailTrans: any;
  textareatrans: any;
  notification: any;

  constructor(private userSvc: UserService
    ,private router: Router
    ,private modalService: ModalService
    ) {
      this.getboth();
    }

  ngOnInit():void {
    //format url
    let url: string = this.router.url.substring(0, this.router.url.indexOf("?"));
    this.router.navigateByUrl(url);
    this.reloadItem();
  }

  getboth(){
    this.getUser();
    this.getTrans();
  }

  getUser() {
    return this.userSvc.getInfor().subscribe((data: any)=>{
      if(data){
        if(data.Code == 401){
          this.router.navigate(['/login']);
          localStorage.removeItem('AccessToken');
        }
        this.userInfo = data;
      }
    });
  }

  getTrans(){
    return this.userSvc.getTransHistory().subscribe((data:any)=>{
      if(data){
        this.fullTrans = data.Data;
      } 
    });
  }

  Logout(){
    localStorage.removeItem('AccessToken');
    window.location.reload();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  //check_logout
  openModal(id) {
    this.modalService.open(id);
  }

  closeModal(id) {
    this.modalService.close(id);
  }

  openModalTrans(id, idTrans) {
    this.removeReloadItem();
    this.modalService.open(id);
    return this.userSvc.getDataTrans(idTrans).subscribe((data: any) => {
      if(data){
        this.detailTrans = data;
        if(this.detailTrans.Code == 0){
          const stringifiedData = JSON.stringify(this.detailTrans.Data);
          const parsedJson = JSON.parse(stringifiedData);
          this.textareatrans = parsedJson;
          this.notification = this.detailTrans.Message;
        }else{
          this.openModal('fail-trans');
          this.notification = this.detailTrans.Message;
        }
      }
    })
  }

  closeModalTrans(id) {
    this.modalService.close(id);
    this.reloadItem();
  }

  //reload blance
  reloadItem(){
    this.removeReloadItem();
    this.loading = setInterval(() => {
      this.getboth();
    }, 30000);
  }

  removeReloadItem() {
    clearInterval(this.loading);
  }

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  dynamicDownloadTxt() {
    this.dyanmicDownloadByHtmlTag({
      fileName: 'MaxClone-data-txt',
      text: this.textareatrans
    });
  }

  dynamicDownloadJson() {
    this.dyanmicDownloadByHtmlTag({
      fileName: 'MaxClone-data-parse.json',
      text: this.textareatrans
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
