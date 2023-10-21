import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeSentences'
})
export class CapitalizeSentencesPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    return value
      .split(' ')
      .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
      .join(' ');
  }

}
