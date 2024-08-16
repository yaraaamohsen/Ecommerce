import { Component } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories.service';
import { Categories } from '../../../shared/models/categories';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  constructor(private _CategoriesService:CategoriesService){}
  
  categoriesArr !: Categories[]; 

  ngOnInit(): void{
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('currentPage' , '/categories')
    }  

    this._CategoriesService.getAllCategories().subscribe({
      next: (res)=>{this.categoriesArr = res.data},
      error: (err)=> {console.log(err)}
    })
  }
}
