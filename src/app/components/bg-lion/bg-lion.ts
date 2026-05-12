import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '../../commons/services/translateService';

@Component({
  selector: 'app-bg-lion',
  imports: [],
  templateUrl: './bg-lion.html',
  styleUrl: './bg-lion.scss',
})
export class BgLion {
  logoPath: string = 'assets/images/shishi.png';
  private observer: MutationObserver | undefined;

  constructor(
    public translate: TranslateService,
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

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
