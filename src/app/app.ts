import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';import { Navbar } from "./components/navbar/navbar";
import { HeroComponent } from "./components/hero/hero";
import { About } from './components/about/about';
import { TranslateService } from './commons/services/translateService';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, About, HeroComponent],
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
