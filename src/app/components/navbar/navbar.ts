import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { Button, ButtonModule } from "primeng/button";
import { MenuItem } from 'primeng/api';
import { take } from 'rxjs';
import { TranslateService } from '../../commons/services/translateService';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, Button, AsyncPipe, ButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  
})
export class Navbar {

  constructor(
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  isDarkMode = true;
  items: MenuItem[]|undefined;
  
  ngOnInit() {
    this.items = [
        { icon: 'pi pi-github', styleClass: 'nav-social-item', url: 'https://github.com/pablocoba', target: '_blank' },
        { icon: 'pi pi-linkedin', styleClass: 'nav-social-item', url:'https://www.linkedin.com/in/pablocobadev/', target: '_blank' },
        { label: 'Sobre mí', icon: 'pi pi-user'},
        { label: 'Proyectos', icon: 'pi pi-briefcase' },
        { label: 'Contacto', icon: 'pi pi-envelope' }
    ];
  }
  //función para quitar o poner el modo oscuro
  toggleDarkMode() {
    const element = document.documentElement; 
    element.classList.toggle('my-app-dark');  
    this.isDarkMode = !this.isDarkMode;
    // window.dispatchEvent(new Event('themeChanged')); no hace falta de momento
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

  //función para que se vean en el navbar los iconos de git y linkedin cuando no se vean en el landing page
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scroll = window.scrollY;
      // Usamos el documento para que el CSS pueda leer la variable globalmente
      const root = document.documentElement;

      if (scroll >= 300) {
        root.style.setProperty('--social-scale', '1');
      } else {
        root.style.setProperty('--social-scale', '0');
      }
    }
  }

}
