import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemService } from './services/item.service';
import { CategoryService } from './services/category.service';
import { DashboardService } from './services/dashboard.service';
import { AuthService } from './services/auth.service';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './guards/auth-guard.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocationService } from './services/location.service';
import { ConditionService } from './services/condition.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    AccessDeniedComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [
    ItemService,
    DashboardService,
    CategoryService,
    AuthService,
    LocationService,
    ConditionService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
