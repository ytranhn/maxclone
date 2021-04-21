import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  readonly rootUrl = 'http://api.maxclone.vn/';
  private token: any;
  constructor(private http: HttpClient) { }

  public getHttpHeader(): { headers: HttpHeaders } {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding',
        'AccessToken': this.getAccessToken(),
      })
    };
    return httpOptions;
  }

  getAccessToken(){
    return localStorage.getItem('AccessToken');
  };

  registerUser(userForm){
    return this.http.post(this.rootUrl + 'api/user/register', userForm);
  }

  userAuthentication(userName, password){
     var data = {"Username": userName, "Password":password};
     return this.http.post(`${this.rootUrl}api/user/login`, data);
  }

  getInfor() {
    return this.http.get(this.rootUrl+'api/user/myself', {headers: new HttpHeaders({'AccessToken': this.getAccessToken()})});
  }

  getTransHistory(){
    return this.http.get(this.rootUrl+'api/user/transactionhistory', {headers: new HttpHeaders({'AccessToken': this.getAccessToken()})});
  }

  getStock(){
    return this.http.get(this.rootUrl+'api/global/stocknow');
  }

  buyStock(body: any){
    return this.http.post(`${this.rootUrl}api/user/buyclone`, body
    , {
      headers: new HttpHeaders({
        'AccessToken': this.getAccessToken()
      })}).toPromise();
  }

  getDataTrans(id: any){
    return this.http.get(this.rootUrl+'api/user/transactiondetail?id='+id, {headers: new HttpHeaders({'AccessToken': this.getAccessToken()})});
  }

}
