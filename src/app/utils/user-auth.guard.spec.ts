import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user";
import { AuthenticationService } from "../services/authentication.service";

import { UserAuthGuard } from "./user-auth.guard";

describe("UserAuthGuard", () => {
  let guard: UserAuthGuard;
  const ass = new BehaviorSubject("NIXT");
  const cus = new BehaviorSubject(User.createNoUser());

  beforeEach(() => {
    const authService = jasmine.createSpyObj("AuthenticationService", ["authenticationStatusSubject", "currentUserSubject"]);
    authService.authenticationStatusSubject = ass;
    authService.currentUserSubject = cus;

    TestBed.configureTestingModule({
      providers: [{ provide: AuthenticationService, useValue: authService }],
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(UserAuthGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
