import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = environment.apiUrl;
  token: string;

  httpHeaders: HttpHeaders = new HttpHeaders({
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });

  constructor(private http?: HttpClient, private router?: Router) {

  }

  authentication(user) {
    const url = this.baseUrl + 'auth/authorize';

    const data = {
      "username": user.username,
      "password": user.password
    };

    return this.http.post(url, data, {headers: this.httpHeaders, responseType: 'json'});
  }


  logout(auth) {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
