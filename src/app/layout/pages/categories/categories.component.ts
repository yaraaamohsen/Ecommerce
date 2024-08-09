import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  ngOnInit(): void{
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('currentPage' , '/categories')

    }  }
}
