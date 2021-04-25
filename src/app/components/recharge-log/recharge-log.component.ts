import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recharge-log',
  templateUrl: './recharge-log.component.html',
  styleUrls: ['./recharge-log.component.less']
})
export class RechargeLogComponent implements OnInit {
  tab: any;
  @Input() childMessage: any;
  public textName: string;
  constructor() { }

  ngOnInit(): void {
    this.tab = 'tab1';
    this.textName = (localStorage.getItem('AccessToken') === null) ? 'your username' : this.childMessage;
  }

  clickShow(check: number) {
    if(check==1){
      this.tab = 'tab1';
    }else if(check==2){
      this.tab = 'tab2';
    }else{
      this.tab = 'tab3';
    }    
  }
}
