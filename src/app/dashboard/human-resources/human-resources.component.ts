import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-human-resources',
  templateUrl: './human-resources.component.html',
  styleUrls: ['./human-resources.component.scss']
})
export class HumanResourcesComponent implements OnInit {

  constructor(private rotuter: Router) { }

  ngOnInit(): void {
    $.getScript("./assets/js/human-resources.js");
    $.getScript("../../../assets/js/jquery.min.js");
    $.getScript("../../../assets/js/assets/js/jquery.scrolly.min.js");
    $.getScript("../../../assets/js/jquery.scrollex.min.js");
    $.getScript("../../../assets/js/skel.min.js");
    $.getScript("../../../assets/js/util.js");
    $.getScript("../../../assets/js/main.js");

  }

  onAuth(){
    this.rotuter.navigateByUrl('auth');
  }

}
