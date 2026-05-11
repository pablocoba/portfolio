import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { Button, ButtonModule } from "primeng/button";
import { MenuItem } from 'primeng/api';
import { take } from 'rxjs';
import { TranslateService } from '../../commons/services/translateService';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, Button, AsyncPipe, ButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  
})
export class Navbar {

  constructor(public translate: TranslateService) {}

  isDarkMode = true;
  items: MenuItem[]|undefined;
  
  ngOnInit() {
          this.items = [
              { label: 'Sobre mí', icon: 'pi pi-user' },
              { label: 'Proyectos', icon: 'pi pi-briefcase' },
              { label: 'Contacto', icon: 'pi pi-envelope' }
          ];
      }
  //función para quitar o poner el modo oscuro
  toggleDarkMode() {
    const element = document.documentElement; 
    element.classList.toggle('my-app-dark');  
    this.isDarkMode = !this.isDarkMode;
  }

  //función para cambiar el idioma. Por defecto en español.
  toggleLanguage() {
    
    this.translate.currentLang$.pipe(take(1)).subscribe(lang => {
      const nextLang = lang === 'es' ? 'en' : 'es';
      this.translate.use(nextLang);
    });
  }

  //vuelve al inicio al clickar en el nombre del navbar
  scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  }

}
