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
import { MediaCollectionDefinitionComponent } from './media-collection-definition/media-collection-definition.component';
import { MediaItemDefinitionComponentComponent } from './media-collection-definition/media-item-definition-component/media-item-definition-component.component';
import { DashComponent } from './dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { CardComponent } from './overview/card/card.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, OverviewComponent, MediaCollectionDefinitionComponent, MediaItemDefinitionComponentComponent, DashComponent, CardComponent],
  imports: [HttpClientModule, BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, AppRoutingModule, MatModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, LayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
