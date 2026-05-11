import { ChangeDetectorRef, Component } from '@angular/core';
import { Button } from "primeng/button";
import { TranslatePipe } from "../../commons/pipes/translatePipe";
import { TranslateService } from '../../commons/services/translateService';

@Component({
  selector: 'app-about',
  imports: [TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  constructor(
    public translate: TranslateService,
    private cd: ChangeDetectorRef // Inyecta esto
  ) {}
}
