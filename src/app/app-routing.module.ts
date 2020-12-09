import { Injectable, NgModule } from "@angular/core";
import { Routes, RouterModule, CanDeactivate } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { OverviewComponent } from "./overview/overview.component";
import { UserAuthGuard } from "./utils/user-auth.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/overview", pathMatch: "full" },
  { path: "overview", component: OverviewComponent, canActivate: [UserAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
