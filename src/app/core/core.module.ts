import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from "./auth/auth.service";
import {RoleService} from "./role/role.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    AuthService,
    RoleService
  ]
})
export class CoreModule { }
