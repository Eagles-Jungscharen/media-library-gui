import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { AuthenticationService } from "../services/authentication.service";
import { Observable } from "rxjs";
import { by } from "protractor";
import { environment } from "src/environments/environment";
import { mergeMap } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  byPassURL: string[] = [];
  constructor(public auth: AuthenticationService) {
    this.byPassURL.push(environment.loginHost + "/api/authenticate");
    this.byPassURL.push(environment.loginHost + "/api/refresh");
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.byPassURL.includes(request.url) || this.auth.isByPassUrl(request.url)) {
      return next.handle(request);
    }
    return this.auth.getToken().pipe(
      mergeMap((token) => {
        request = request.clone({
          setHeaders: {
            Authorization: "Bearer " + token,
          },
        });
        return next.handle(request);
      })
    );
  }
}
