import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of, ReplaySubject, throwError } from "rxjs";
import { map, catchError, filter, take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "../models/user";
import { B } from "@angular/cdk/keycodes";

export enum ApplicationStatus {
  LOADING,
  AUTHENTICATED,
  UNAUTHENTICATED,
}
export interface AuthenticationError {
  error: string;
  details: string;
}

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private jwtHelper: JwtHelperService;
  authenticationStatusSubject = new BehaviorSubject<ApplicationStatus>(ApplicationStatus.LOADING);
  currentUserSubject = new BehaviorSubject<User>(User.createNoUser());

  private refreshTokenObservable: ReplaySubject<string> = null;
  private mediaByPassUrl = [];

  constructor(private httpClient: HttpClient) {
    this.jwtHelper = new JwtHelperService();
    const accessToken = localStorage.getItem("ml_accesstoken");
    const refreshToken = localStorage.getItem("ml_refreshtoken");
    if (accessToken && accessToken !== "") {
      this.extractUser(accessToken);
      this.authenticationStatusSubject.next(ApplicationStatus.AUTHENTICATED);
    } else {
      this.authenticationStatusSubject.next(ApplicationStatus.UNAUTHENTICATED);
    }
  }

  authenticate(username: string, password: string): Observable<void> {
    return this.httpClient
      .post<any>(environment.loginHost + "/api/authenticate", {
        username: username,
        password: password,
      })
      .pipe(
        map((value) => {
          this.processTokens(value.access_token, value.refresh_token);
          this.extractUser(value.access_token);
          this.authenticationStatusSubject.next(ApplicationStatus.AUTHENTICATED);
          return;
        }),
        catchError(this.errorHandler)
      );
  }

  getToken(): Observable<string> {
    const token = localStorage.getItem("ml_accesstoken");
    const refreshToken = localStorage.getItem("ml_refreshtoken");
    const isExpired = this.jwtHelper.isTokenExpired(token);
    if (isExpired) {
      console.log("RT: " + refreshToken);
      const headers = new HttpHeaders({ Authorization: "Bearer " + token });
      if (this.refreshTokenObservable == null) {
        this.refreshTokenObservable = new ReplaySubject<string>(1);
        this.httpClient
          .post<any>(
            environment.loginHost + "/api/refresh",
            {
              refreshToken: refreshToken,
            },
            { headers: headers }
          )
          .subscribe((value) => {
            const token = value.access_token;
            this.processTokens(value.access_token, value.refresh_token);
            this.refreshTokenObservable.next(token);
            this.refreshTokenObservable == null;
          });
      }
      return this.refreshTokenObservable;
    } else {
      return of(localStorage.getItem("ml_accesstoken"));
    }
  }

  logout(): void {
    localStorage.removeItem("ml_accesstoken");
    localStorage.removeItem("ml_refreshtoken");
    this.authenticationStatusSubject.next(ApplicationStatus.UNAUTHENTICATED);
    this.currentUserSubject.next(User.createNoUser());
  }

  get applicationStatus(): ApplicationStatus {
    return this.authenticationStatusSubject.getValue();
  }

  get currentUser(): User {
    return this.currentUserSubject.getValue();
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

  private errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      const authError: AuthenticationError = { error: error.error.message, details: JSON.stringify(error.error) };
      return throwError(authError);
    } else {
      if (error.status === 401) {
        const authError: AuthenticationError = { error: "Falscher Benutzername / Passwort", details: JSON.stringify(error) };
        return throwError(authError);
      } else {
        const authError: AuthenticationError = { error: "Technischer Fehler", details: JSON.stringify(error) };
        return throwError(authError);
      }
    }
  }

  addMediaByPassUrl(url: string) {
    this.mediaByPassUrl.push(url);
  }
  isByPassUrl(url: string): boolean {
    return this.mediaByPassUrl.includes(url);
  }
}
