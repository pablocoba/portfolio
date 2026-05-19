import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { Button, ButtonModule } from "primeng/button";
import { MenuItem } from 'primeng/api';
import { take } from 'rxjs';
import { TranslateService } from '../../commons/services/translateService';
import { AsyncPipe, CommonModule, isPlatformBrowser } from '@angular/common';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, Button, AsyncPipe, ButtonModule, CommonModule, MenuModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  
})
export class Navbar {

  constructor(
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}
  isMenuVisible = false;
  isDarkMode = true;
  items: MenuItem[]|undefined;
  currentLangStr = 'es';
  lang:string = '';
  showUpButton = false;

  ngOnInit() {
    this.translate.currentLang$.subscribe(() => {
        this.currentLangStr = this.lang;
        this.buildMenu();
    });
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
        //que aparezca el botón de subir al inicio después de scrollear un poco también
        this.showUpButton = true;
      } else {
        root.style.setProperty('--social-scale', '0');
        this.showUpButton = false;
      }
    }

    this.isMenuVisible = window.scrollY > 50;
    
  }
  
  buildMenu() {
  // Usamos get instantáneo porque estamos dentro de la suscripción al cambio
  this.items = [
    { 
      icon: 'pi pi-github', 
      styleClass: 'nav-social-item',
      url: 'https://github.com/tu-user',
      target: '_blank'
    },
    { 
      icon: 'pi pi-linkedin', 
      styleClass: 'nav-social-item',
      url: 'https://linkedin.com/in/tu-user',
      target: '_blank'
    },
    { 
      label: this.translate.translate('CONTACT'), 
      icon: 'pi pi-envelope',
      routerLink: '/contacto'
    }
  ];
}

  get dots(): MenuItem[] {
  return [
    
    {
      label: this.currentLangStr === 'es' ? 'EN' : 'ES',
      icon: 'pi pi-globe',
      command: () => {
        this.toggleLanguage();
      }
    },
    {
      label: '',
      icon: this.isDarkMode ? 'pi pi-sun' : 'pi pi-moon',
      command: () => {
        this.toggleDarkMode();
      }
    }
  ];
}

get social(): MenuItem[] {
  return [
    
    {
      label: '',
      icon: 'pi pi-linkedin',
      command: () => {
        // this.toggleLanguage();
      }
    },
    {
      label: '',
      icon: 'pi pi-github',
      command: () => {
        // this.toggleDarkMode();
      }
    }
  ];
}

}
