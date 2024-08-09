import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  ngOnInit(): void{
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('currentPage' , '/cart')

    }  }
}
