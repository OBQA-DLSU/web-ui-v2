import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import * as _ from 'lodash';
import { ROUTES } from '../config';
import { ISession } from '../interfaces/session/session.interface';
import { IRole } from '../interfaces/role/role.interface';

declare const $: any;


@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  getRoute(): string {
    const session: ISession = JSON.parse(localStorage.getItem('session'));
    const Role: IRole = session.User.Role;
    switch (Role.code.toUpperCase()) {
      case 'ADMIN':
        return 'ADMIN';
      case 'MEMBER':
        if (session.isStudent) { return 'STUDENT'; }
        if (!session.isStudent && session.isAdmin) { return 'COORDINATOR'; }
        if (!session.isStudent && !session.isAdmin) { return 'INSTRUCTOR'; }
      default:
        return 'GUEST';
    }
  }

  ngOnInit() {
    this.menuItems = ROUTES[this.getRoute()].filter(menuItem => menuItem);
  }
  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
      let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
    }
  }
  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  onSignOut () {

  }

  redirectToProfile () {

  }
}
