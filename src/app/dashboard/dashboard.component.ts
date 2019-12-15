import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {RoleService} from "../core/role/role.service";
import {Role} from "../core/role/role";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewChecked {

  roles: Role[];
  pagination;
  pages = [];
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  constructor(private roleService: RoleService) {
  }

  ngOnInit() {
    this.getPage()
  }

  ngAfterViewChecked(): void {
  }

  getPage(pag = 1) {
    this.roleService.list(pag).subscribe(res => {
      this.roles = (res['data'].map((propertyName: any) => new Role(propertyName)));
      this.pagination = res['meta'].pagination;
      this.countPages();
      console.log(this.pagination)
    })
  }

  cleanString(string) {
      return string.replace("." || "-" || "_"," ")
  }

  countPages() {
    this.pages = [];
    if (this.pagination != undefined)
      for (var i = 1; i <= this.pagination['total_pages']; i++) {
        this.pages.push(i);
      }
    console.log(this.pages);
    return this.pages;
  }

  next() {
    console.log(this.pagination.current_page)
    if(this.pagination.current_page + 1 <= this.pagination.total_pages){
      this.getPage(this.pagination.current_page + 1);
    }
  }
  previous() {
    console.log(this.pagination.current_page)
    if(this.pagination.current_page - 1 >= 0){
      this.getPage(this.pagination.current_page - 1)
    }
  }
}
