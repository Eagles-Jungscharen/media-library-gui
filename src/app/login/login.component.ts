import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApplicationStatus, AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loading = false;
  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });
  noAccess = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.authenticationStatusSubject.subscribe((status) => {
      if (status == ApplicationStatus.AUTHENTICATED) {
        if (this.authenticationService.currentUser.isAdmin || this.authenticationService.currentUser.isContributor) {
          this.router.navigateByUrl("/overview");
        } else {
          this.noAccess = true;
        }
      }
    });
  }

  ngOnInit(): void {}

  showLogin(): boolean {
    return this.authenticationService.applicationStatus == ApplicationStatus.UNAUTHENTICATED;
  }

  canLogin(): boolean {
    return this.loginForm.valid;
  }

  doLogin() {
    this.loading = true;
    this.authenticationService.authenticate(this.loginForm.get("username").value, this.loginForm.get("password").value).subscribe(
      () => {
        this.loading = false;
      },
      (error) => {
        console.log("WAR WOL NIX: " + error);
        console.dir(error);
        this.loading = false;
      }
    );
  }
  doLogout() {
    this.noAccess = false;
    this.authenticationService.logout();
  }
}
