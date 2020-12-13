import { TestBed, waitForAsync } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { AuthenticationService } from "./services/authentication.service";
import { BehaviorSubject, of } from "rxjs";
import { User } from "./models/user";

import { MatModule } from "./mat.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

describe("AppComponent", () => {
  const ass = new BehaviorSubject("NIXT");
  const cus = new BehaviorSubject(User.createNoUser());
  beforeEach(
    waitForAsync(() => {
      const authService = jasmine.createSpyObj("AuthenticationService", ["authenticationStatusSubject", "currentUserSubject"]);
      authService.authenticationStatusSubject = ass;
      authService.currentUserSubject = cus;
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        providers: [{ provide: AuthenticationService, useValue: authService }],
        imports: [MatModule, BrowserAnimationsModule, RouterTestingModule],
      }).compileComponents();
    })
  );

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  /*
  it(`should have as title 'media-library-gui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("media-library-gui");
  });

  it("should render title", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".content span").textContent).toContain("media-library-gui app is running!");
  });
  */
});
