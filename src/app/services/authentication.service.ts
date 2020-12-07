import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "../models/user";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private jwtHelper: JwtHelperService;
  authenticationStatusSubject = new BehaviorSubject("LOADING");
  currentUserSubject = new BehaviorSubject(User.createNoUser());

  constructor(private httpClient: HttpClient) {
    this.jwtHelper = new JwtHelperService();
    const accessToken = localStorage.getItem("ml_accesstoken");
    const refreshToken = localStorage.getItem("ml_refreshtoken");
    if (accessToken && accessToken !== "") {
      this.extractUser(accessToken);
      this.authenticationStatusSubject.next("LOGGEDIN");
    } else {
      this.authenticationStatusSubject.next("LOGGEDOUT");
    }
  }

  authenticate(username: string, password: string): Observable<boolean> {
    return this.httpClient
      .post<any>(environment.loginHost + "/api/authenticate", {
        username: username,
        password: password,
      })
      .pipe(
        map((value) => {
          this.processTokens(value.access_token, value.refresh_token);
          this.extractUser(value.access_token);
          this.authenticationStatusSubject.next("LOGGEDIN");
          return true;
        })
      );
  }

  private processTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem("ml_accesstoken", accessToken);
    localStorage.setItem("ml_refreshtoken", refreshToken);
  }
  private extractUser(accessToken: string): void {
    const tokenModel = this.jwtHelper.decodeToken(accessToken);
    const user = User.createUser(tokenModel.firstname, tokenModel.lastname, tokenModel.email);
    this.currentUserSubject.next(user);
  }
}
