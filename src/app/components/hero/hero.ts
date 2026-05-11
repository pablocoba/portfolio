import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ButtonModule, Button } from 'primeng/button';
import { TranslatePipe } from '../../commons/pipes/translatePipe';
import { TranslateService } from '../../commons/services/translateService';

@Component({
  selector: 'app-hero',
  imports: [Button, TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    //detecta cambios en el lenguaje
    this.translate.currentLang$.subscribe(() => {
      this.cd.detectChanges(); 
    });
  }
}
