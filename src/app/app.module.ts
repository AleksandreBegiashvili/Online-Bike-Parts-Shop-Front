import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemService } from './services/item.service';
import { HomeService } from './services/home.service';
import { DashboardService } from './services/dashboard.service';
import { AuthService } from './services/auth.service';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    ItemService,
    HomeService,
    DashboardService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
