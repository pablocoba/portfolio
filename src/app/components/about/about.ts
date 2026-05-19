import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Button } from "primeng/button";
import { TranslatePipe } from "../../commons/pipes/translatePipe";
import { TranslateService } from '../../commons/services/translateService';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  constructor(
    public translate: TranslateService,
    private cd: ChangeDetectorRef,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object //esto es para que se ejecute en cliente y no de error de SSR
  ) {}

  //variable para poder volver a scrollear hacia arriba.
  private hasScrolled = false;


  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)){
      const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        //si el usuario baja y la sección aparece, y aún no hemos forzado el scroll
        const isDesktop = window.innerWidth >= 768;

        if (entry.isIntersecting && !this.hasScrolled && isDesktop) {
          this.scrollToSection();
          this.hasScrolled = true; // marcamos que ya se hizo una vez
        }
      });
    }, { threshold: 0.6 }); // se activa cuando el 50% del componente es visible

    observer.observe(this.el.nativeElement);
    }

  }

  scrollToSection() {
    this.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // si el usuario vuelve arriba del todo, se resetea el flag
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY === 0) {
      this.hasScrolled = false;
    }
  }

}
