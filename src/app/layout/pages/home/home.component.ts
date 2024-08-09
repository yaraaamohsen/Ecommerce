import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ngOnInit(): void{
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('currentPage' , '/home')

    }  }
}
