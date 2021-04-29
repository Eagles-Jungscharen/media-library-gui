export class User {
  firstName: string = "";
  lastName: string = "";
  eMail: string = "";
  scopes: string[] = [];
  isAdmin: boolean = false;
  isContributor: boolean = false;

  public static createNoUser(): User {
    return new User();
  }

  public static createUser(firstName: string, lastName: string, email: string): User {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.eMail = email;
    return user;
  }
}
