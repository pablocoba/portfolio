import { ChangeDetectorRef, Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '../../commons/services/translateService';

@Component({
  selector: 'app-bg-lion',
  imports: [],
  templateUrl: './bg-lion.html',
  styleUrl: './bg-lion.scss',
})
export class BgLion {
  logoPath: string = 'assets/images/shishi.png';
  offsetX = 0;
  offsetY = 0;
  opacity = 0.8;
  private observer: MutationObserver | undefined;

  constructor(
    public translate: TranslateService,
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(window.innerWidth >= 768){
      const opThreshold = 500;
      //calculamos el movimiento del eje y en base al scroll
      const scroll = window.pageYOffset || document.documentElement.scrollTop;

      if(scroll <= opThreshold){
        this.opacity = 0.8;
      }
      else{
        //le aplicamos distinta opacidad según la distancia scrolleada (para mejorar visibilidad en apartado skills)
        const newOpacity = .8 - (scroll / 1700);
        //devolvemos la nueva opacidad
        this.opacity = this.opacity = Math.max(0, newOpacity);
      }
      
      //efecto parallax en el eje X
      this.offsetX = scroll * 0.71;
      this.offsetY = scroll;
    }
    else{
      //en moviles la opacidad no cambia
      this.opacity = 1;
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
