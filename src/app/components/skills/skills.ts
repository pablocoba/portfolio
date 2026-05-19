import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '../../commons/services/translateService'; 
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from "../../commons/pipes/translatePipe";

@Component({
  selector: 'app-skills',
  imports: [TranslatePipe],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {

  //variable para poder volver a scrollear hacia arriba.
  private hasScrolled = false;
  opacityMain: number = 1;
  opacitySoft: number = 0;

  constructor(
    public translate: TranslateService,
    private cd: ChangeDetectorRef,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object //esto es para que se ejecute en cliente y no de error de SSR
  ) {}
  
  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)){
      const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        //si el usuario baja y la sección aparece, y aún no hemos forzado el scroll
        if (entry.isIntersecting && !this.hasScrolled) {
          this.scrollToSection();
          this.hasScrolled = true; // marcamos que ya se hizo una vez
        }
      });
    }, { threshold: 0.55 }); // se activa cuando el 70% del componente es visible

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
