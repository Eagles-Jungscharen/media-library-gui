import { Injectable, NgModule } from "@angular/core";
import { Routes, RouterModule, CanDeactivate } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MediaCollectionDefinitionComponent } from "./media-collection-definition/media-collection-definition.component";
import { MediaItemComponent } from "./media-item/media-item.component";
import { OverviewComponent } from "./overview/overview.component";
import { UserAuthGuard } from "./utils/user-auth.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/overview", pathMatch: "full" },
  { path: "overview", component: OverviewComponent, canActivate: [UserAuthGuard] },
  { path: "mediacollectiondefinition/:id", component: MediaCollectionDefinitionComponent, canActivate: [UserAuthGuard] },
  { path: "mediaitem/:id", component: MediaItemComponent, canActivate: [UserAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
