import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/user-profile/services/profile.service';
import { SidebarService } from '../../shared/sidebar/sidebar.service'


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  userProfile: any;
  userId: any;
  products: any;
  constructor(public sidebarservice: SidebarService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private profileService: ProfileService) { }

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
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });

    this.activatedRoute.params.subscribe(params=>{
      const id: any = params['id'] || null;
      console.log(id);
      this.userId = id;

    })
    this.profileService.getUserById(this.userId)
        .subscribe(resp=>{
          if(resp.ok){
            this.userProfile = resp.usuario;
          }
        });

        this.profileService.obtenerProductosDeUsuario(this.userId)
         .subscribe(resp=>{
          if(resp.ok){
            this.products = resp.produts
          }
         });




  }

}
