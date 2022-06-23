import { Router } from '@angular/router';
import { Component , OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { AuthServiceService } from '../../auth/services/auth-service.service';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{



  user: any;

    constructor(public sidebarservice: SidebarService,
                private authService: AuthServiceService,
                private router: Router) { }

    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    }

    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    ngOnInit() {

        /* Search Bar */
        $(document).ready(function () {
            $(".mobile-search-icon").on("click", function () {
                $(".search-bar").addClass("full-search-bar")
            }),
            $(".search-close").on("click", function () {
                $(".search-bar").removeClass("full-search-bar")
            })
        });

        this.user = this.authService.user;
        console.log(this.user);

    }

    onProfile(){
      this.router.navigateByUrl('profile');
    }

    logOut(){
      this.router.navigateByUrl('');
      this.authService.logOut();
    }
}
