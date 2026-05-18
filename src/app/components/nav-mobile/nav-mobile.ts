import { Component } from '@angular/core';
import { Menubar } from "primeng/menubar";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-nav-mobile',
  imports: [Menubar, ButtonModule],
  templateUrl: './nav-mobile.html',
  styleUrl: './nav-mobile.scss',
})
export class NavMobile {}
