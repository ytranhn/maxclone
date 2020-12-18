import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  currDiv: string = 'login';
  notification: string;
  constructor(private userSvc: UserService, private router: Router) { }

  ngOnInit() {
    let url: string = this.router.url.substring(0, this.router.url.indexOf("?"));
    this.router.navigateByUrl(url);
    
    if(localStorage.getItem('AccessToken') != null){
      this.router.navigate(['/dashboard']);
    }
  }

  ShowDiv(divVal: string) {
    this.currDiv = divVal;
  }

  OnLogin(userName, password){
    this.userSvc.userAuthentication(userName,password).subscribe((data: any) =>{
      if(data){
        if(data.Code == 0){
          localStorage.setItem('AccessToken', data.Data.TokenInfo.AccessToken);
          this.router.navigate(['/dashboard']);
        }else{
          this.notification = data.Message;
        }
      }
    });
  }

  OnRegister(userName:string, password:string, email:string){
    const userForm = {
      Username: userName,
      Password: password,
      Email: email
    }
    this.userSvc.registerUser(userForm).subscribe((data: any) =>{
      if(data){
        if(data.Code == 0)
        {
          this.OnLogin(userName, password);
        }else{
          this.notification = data.Message;
        }
      }
    })
  }
}
