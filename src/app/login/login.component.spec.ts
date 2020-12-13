import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user";
import { AuthenticationService } from "../services/authentication.service";

import { LoginComponent } from "./login.component";
import { MatModule } from "../mat.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const ass = new BehaviorSubject("NIXT");
  const cus = new BehaviorSubject(User.createNoUser());

  beforeEach(async () => {
    const authService = jasmine.createSpyObj("AuthenticationService", ["authenticationStatusSubject", "currentUserSubject"]);
    authService.authenticationStatusSubject = ass;
    authService.currentUserSubject = cus;

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: AuthenticationService, useValue: authService }],
      imports: [MatModule, BrowserAnimationsModule, ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
