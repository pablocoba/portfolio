import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';import { Navbar } from "./components/navbar/navbar";
import { HeroComponent } from "./components/hero/hero";
import { About } from './components/about/about';
import { TranslateService } from './commons/services/translateService';
import { BgLion } from './components/bg-lion/bg-lion';
import { Skills } from './components/skills/skills';
import { Trajectory } from './components/trajectory/trajectory';
import { Softskills } from "./components/softskills/softskills";




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, About, HeroComponent, BgLion, Skills, Trajectory, Softskills],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.translate.use('es'); // Idioma por defecto al cargar
  }
  protected readonly title = signal('portfolio');
}
