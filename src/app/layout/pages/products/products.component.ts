import { Component } from '@angular/core';
import { AllProductsService } from '../../../shared/services/all-products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  ngOnInit(): void{
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('currentPage' , '/products')
    }
    this._AllProductsService.getAllProducts().subscribe(response =>{
      console.log(response.data);
      
    })
  }

  constructor(private _AllProductsService:AllProductsService){}


}
