import {Injectable} from '@angular/core';
import {Role} from "./role";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseUrl = environment.apiUrl;
  httpHeaders: HttpHeaders = new HttpHeaders({
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem('token')
  });

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  list(offset?: number): Observable<Role[]> {
    let subject = new Subject<Role[]>();
    this.http.get(this.baseUrl + `role?page=` + offset,
      {headers: this.httpHeaders})
      .subscribe((json: any[]) => {
        subject.next(json)
      }, error => {
        this.authService.logout();
      });
    return subject.asObservable();
  }
}
