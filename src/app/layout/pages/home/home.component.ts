import { Component } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { Product } from '../../../shared/models/products';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CategoriesService } from '../../../shared/services/categories.service';
import { Categories } from '../../../shared/models/categories';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CarouselModule, CurrencyPipe, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  constructor(private _ProductsService: ProductsService, private _CategoriesService: CategoriesService, private _CartService: CartService, private _ToastrService: ToastrService) { }
  isLoading: boolean = false;
  productsArr !: Product[];
  errorMessage !: string;
  categoriesArr!: Categories[];
  searchVal: string = '';

  ngOnInit(): void {
    this.isLoading = true;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/home')
    }
    this._ProductsService.getAllProduct().subscribe({
      next: (res) => {
        this.productsArr = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message;
      }
    })

    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => { this.categoriesArr = res.data },
      error: (err) => {this.errorMessage = err.error.message}
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  addToCart(pId: string) {
      this._CartService.addProduct(pId).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._CartService.hamada();
      },
      error: (err)=>{this.errorMessage = err.error.message}

    })
  }
}
