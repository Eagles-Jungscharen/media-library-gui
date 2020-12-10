import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

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

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {}

  canLogin(): boolean {
    return this.loginForm.valid;
  }

  doLogin() {
    this.loading = true;
    this.authenticationService.authenticate(this.loginForm.get("username").value, this.loginForm.get("password").value).subscribe(
      () => {
        this.loading = false;
        setTimeout(() => this.router.navigateByUrl("/overview"), 100);
      },
      (error) => {
        console.log("WAR WOL NIX: " + error);
        console.dir(error);
        this.loading = false;
      }
    );
  }
}
