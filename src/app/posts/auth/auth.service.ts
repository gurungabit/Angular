import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./authData.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string;
  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post("http://localhost:3000/app/user/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }
  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string }>("http://localhost:3000/app/user/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
      });
  }
}
