import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  toggleMenu=false;
  toggleDrop1=false;
  toggleDrop2=false;
  constructor() { }

  ngOnInit() {
  }
  ontoggled(){
   this.toggleMenu=!this.toggleMenu;
  }
  onDrop1(){
    this.toggleDrop1=!this.toggleDrop1;
  }
  onDrop2(){
    this.toggleDrop2=!this.toggleDrop2;
  }

}
