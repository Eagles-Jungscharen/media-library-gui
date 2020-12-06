import { Component } from "@angular/core";
import { AuthenticationService } from "./services/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "media-library-gui";
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.authenticationStatusSubject.subscribe(
      (value) => {
        console.log("Authentication Status: " + value);
      }
    );
  }
}
