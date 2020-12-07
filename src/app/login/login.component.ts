import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  doLogin() {
    this.authenticationService.authenticate(this.loginForm.get("username").value, this.loginForm.get("password").value).subscribe(
      (value) => console.log("LOGINN GEGLÜCKT"),
      (error) => console.log("WAR WOL NIX: " + error)
    );
  }
}
