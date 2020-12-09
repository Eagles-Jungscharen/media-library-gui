import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";

import { MatModule } from "./mat.module";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, OverviewComponent],
  imports: [HttpClientModule, BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, AppRoutingModule, MatModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
