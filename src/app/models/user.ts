export class User {
  firstname: string = "";
  lastname: string = "";
  email: string = "";

  public static createNoUser(): User {
    return new User();
  }

  public static createUser(firstName: string, lastName: string, email: string): User {
    const user = new User();
    user.firstname = firstName;
    user.lastname = lastName;
    user.email = email;
    return user;
  }
}
