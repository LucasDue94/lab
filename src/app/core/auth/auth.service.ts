import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {of, Subject} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  token: string;

  httpHeaders: HttpHeaders = new HttpHeaders({
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  });

  constructor(private http?: HttpClient, private router?: Router) {

  }

  authentication(user) {
    const url = this.baseUrl + 'auth/authorize';
    let subject = new Subject<any[]>();

    const data = {
      "username": user.username,
      "password": user.password
    };

    this.http.post(url, data, {headers: this.httpHeaders, responseType: 'json'})
      .pipe(
        catchError(err => of(err))
      )
      .subscribe((json: any[]) => {
        subject.next(json)
      });
    return subject.asObservable()
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  isLogged = () => localStorage.getItem('token') != null

}
