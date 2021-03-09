import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from "@angular/common";
import {NgxPaginationModule} from 'ngx-pagination';
import { TooltipModule } from 'ng2-tooltip-directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModalModule } from './helpers/_modal/modal/modal.module';
import { NoRightClickDirective } from '../app/helpers/noRightClick/no-right.directive';

import { AuthGuard } from './auth/auth.gaurd';
import { StockComponent } from './components/stock/stock.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { NotificationComponent } from './components/notification/notification.component';
import { RechargeLogComponent } from './components/recharge-log/recharge-log.component';
import { ApiresComponent } from './components/apires/apires.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    StockComponent,
    NoRightClickDirective,
    MaintenanceComponent,
    NotificationComponent,
    RechargeLogComponent,
    ApiresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NgxPaginationModule,
    ModalModule,
    TooltipModule
  ],
  providers: [AuthGuard, DashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
