import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarService } from '../../shared/sidebar/sidebar.service'
import { AuthServiceService } from '../../auth/services/auth-service.service';
import { ProfileService } from 'src/app/user-profile/services/profile.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  idCarrousel:string = "carouselExampleDark"

  nombre: string[] = ['Juan', 'Carlos'];
  user: any;

  products: any;

  constructor(public sidebarservice: SidebarService,
    private router: Router, private authService: AuthServiceService,
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

        this.user = this.authService.user;
        console.log(this.user);

        this.profileService.obtenerProductos()
          .subscribe( resp=>{
            this.products = resp.products;
            console.log(resp);
          });


}

onProfile(id: number){
  this.router.navigateByUrl(`home/${id}`);
}

}
