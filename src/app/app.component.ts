import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./models/user";
import { ApplicationStatus, AuthenticationService } from "./services/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  isMenuOpen = true;
  applicationStatus: ApplicationStatus;
  currentUser: User;

  title = "media-library-gui";
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.authenticationStatusSubject.subscribe((value) => {
      console.log("Authentication Status: " + value);
      this.applicationStatus = value;
      if (value == ApplicationStatus.UNAUTHENTICATED) {
        this.router.navigateByUrl("/login");
      }
    });
    this.authenticationService.currentUserSubject.subscribe((value) => {
      this.currentUser = value;
      console.log(value);
    });
  }

  isLoggedIn(): boolean {
    return this.applicationStatus == ApplicationStatus.AUTHENTICATED;
  }

  getProfilePicture(): string {
    return null;
  }
  logout(): void {
    this.authenticationService.logout();
  }
  getUserName(): string {
    return this.currentUser.firstName + " " + this.currentUser.lastName;
  }
  getEmail(): string {
    return this.currentUser.eMail;
  }
}
