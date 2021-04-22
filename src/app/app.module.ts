import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";

import { MatModule } from "./mat.module";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";
import { OverviewComponent } from "./overview/overview.component";
import { MediaCollectionDefinitionComponent } from "./media-collection-definition/media-collection-definition.component";
import { MediaItemDefinitionComponentComponent } from "./media-collection-definition/media-item-definition-component/media-item-definition-component.component";
import { DashComponent } from "./dash/dash.component";
import { LayoutModule } from "@angular/cdk/layout";
import { CardComponent } from "./overview/card/card.component";
import { TokenInterceptor } from "./utils/token.interceptor";
import { McdTableComponent } from "./mcd-table/mcd-table.component";
import { MediaItemComponent } from "./media-item/media-item.component";
import { MediaItemTableComponent } from "./media-item-table/media-item-table.component";
import localeDe from "@angular/common/locales/de-CH";

import localeDeExtra from "@angular/common/locales/extra/de-CH";
import { registerLocaleData } from "@angular/common";

registerLocaleData(localeDe, "de-CH", localeDeExtra);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OverviewComponent,
    MediaCollectionDefinitionComponent,
    MediaItemDefinitionComponentComponent,
    DashComponent,
    CardComponent,
    McdTableComponent,
    MediaItemComponent,
    MediaItemTableComponent,
  ],
  imports: [HttpClientModule, BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, AppRoutingModule, MatModule, LayoutModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: "de-CH" }, //replace "en-US" with your locale
    //otherProviders...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
