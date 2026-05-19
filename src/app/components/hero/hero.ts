import { ChangeDetectorRef, Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ButtonModule, Button } from 'primeng/button';
import { TranslatePipe } from '../../commons/pipes/translatePipe';
import { TranslateService } from '../../commons/services/translateService';
import { TooltipModule } from 'primeng/tooltip';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [Button, TranslatePipe, TooltipModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements OnInit {

  logoPath: string = 'assets/images/shishi.png';
  private observer: MutationObserver | undefined;

  constructor(
    public translate: TranslateService,
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  nameScale = 1;

  ngOnInit() {
    //detecta cambios en el lenguaje
    this.translate.currentLang$.subscribe(() => {
      this.cd.detectChanges(); 
    });

    if (isPlatformBrowser(this.platformId)) {
      this.updateLogo(); 

      // configuramos el observador para vigilar cambios en las clases del body
      this.observer = new MutationObserver(() => {
        this.updateLogo();
        this.cd.detectChanges(); 
      });

      this.observer.observe(document.documentElement, { 
        attributes: true,
        attributeFilter: ['class']
      });
    }
  }

  //funcion que empequeñece el texto onScroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scroll = window.scrollY;
      const limit = 800; 
      if (scroll <= limit) {
        this.nameScale = 1 - (scroll / limit) * 0.3;
      } else {
        this.nameScale = 1.0;
      }
    }
  }

  //updatea la bg img del hero section
  updateLogo() {
  const isLight = document.documentElement.classList.contains('my-app-dark') || 
  document.body.classList.contains('my-app-dark');
  
  this.logoPath = isLight ? 'assets/images/shishi-light.png' : 'assets/images/shishi.png';
}

  ngOnDestroy() {
    this.observer?.disconnect();
  }
  
}
