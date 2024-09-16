import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arr:any[],searchText:string): any[] {
    return arr.filter((x)=> x.title.toLowerCase().includes(searchText.toLowerCase()));
  }

}
