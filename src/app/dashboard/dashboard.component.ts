import {Component, DoCheck, OnInit} from '@angular/core';
import {RoleService} from "../core/role/role.service";
import {Role} from "../core/role/role";
import {faAngleLeft, faAngleRight, faDoorOpen} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../core/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, DoCheck {

  roles: Role[];
  pagination;
  pages = [];
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faExit = faDoorOpen;
  user = localStorage.getItem('user');

  constructor(private roleService: RoleService, private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.getPage()
  }

  ngDoCheck(): void {
    if (!this.authService.isLogged()) this.router.navigate(['/']);
  }

  getPage(pag = 1) {
    this.roleService.list(pag).subscribe(res => {
      this.roles = (res['data'].map((propertyName: any) => new Role(propertyName)));
      this.pagination = res['meta'].pagination;
      this.countPages();
    })
  }

  logout = () => this.authService.logout();

  cleanString = (string) => string.replace(/[^a-zA-Z0-9]/g, " ");

  countPages() {
    this.pages = [];
    if (this.pagination != undefined)
      for (var i = 1; i <= this.pagination['total_pages']; i++) {
        this.pages.push(i);
      }
    return this.pages;
  }

  next() {
    if (this.pagination.current_page + 1 <= this.pagination.total_pages) {
      this.getPage(this.pagination.current_page + 1);
    }
  }

  previous() {
    if (this.pagination.current_page - 1 >= 0) {
      this.getPage(this.pagination.current_page - 1)
    }
  }
}
