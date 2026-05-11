import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TranslateService {
    private data: any = {};
    private currentLang = new BehaviorSubject<string>('es');
    currentLang$ = this.currentLang.asObservable();

    constructor(private http: HttpClient) { }

    //cogemos el lenguaje de los json
    async use(lang: string): Promise<void> {
        try {
            const data = await lastValueFrom(
                this.http.get(`/docs/i18n/${lang}.json`)
            );
            this.data = data;
            this.currentLang.next(lang);
        } catch (error) {
            //avisa si no encuentra el mensaje
            console.error(`No se pudo cargar el idioma ${lang}`, error);
        }
    }


    translate(key: string): string {
        return this.data[key] || key;
    }
}
