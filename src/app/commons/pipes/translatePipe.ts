import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translateService';

@Pipe({
    name: 'translate',
    pure: false
})

//pipe básico de traducción
export class TranslatePipe implements PipeTransform {
    constructor(private translate: TranslateService) { }

    transform(key: string): string {
        return this.translate.translate(key);
    }
}