import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/products';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(productList: Product[], word: string): Product[] {
    return productList?.filter((p) => p.title.toLowerCase().includes(word.toLowerCase())
    )
  }
}
