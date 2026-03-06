import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthKeyInterceptor } from './interceptors/auth-key.interceptor';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoanProductsComponent } from './pages/loans/loan-products/loan-products.component';
import { LoanApplicationComponent } from './pages/loans/loan-application/loan-application.component';
import { LoanReviewComponent } from './pages/loans/loan-review/loan-review.component';
import { LoanStatusTrackingComponent } from './pages/loans/loan-status-tracking/loan-status-tracking.component';
import { LoanHistoryComponent } from './pages/loans/loan-history/loan-history.component';
import { LoanDetailsComponent } from './pages/loans/loan-details/loan-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    MainLayoutComponent,
    LoanProductsComponent,
    LoanApplicationComponent,
    LoanReviewComponent,
    LoanStatusTrackingComponent,
    LoanHistoryComponent,
    LoanDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      //Without this → interceptor never runs → 403
      provide: HTTP_INTERCEPTORS,
      useClass: AuthKeyInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
