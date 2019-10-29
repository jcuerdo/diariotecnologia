import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private posts = [];
  private page = 0;
  private searchTerm = "";
  private baseURl = "https://www.diariotecnologia.es/api/"

  constructor(private http: HttpClient)  {

  }

  ngOnInit(){
    let promise = this.http.get(this.baseURl);
    promise.subscribe((data : any) => {
      this.posts = data.posts
      this.page++
      this.searchTerm = data.searchTerm
    })
  }

  nextPage(event){
    setTimeout(() => {
      console.log(this.baseURl + "?page=" + (this.page) )
    let promise = this.http.get(this.baseURl + "?page=" + (this.page) );
    promise.subscribe((data : any) => {
      this.posts = this.posts.concat(data.posts)
      this.page++
      this.searchTerm = data.searchTerm
      
      event.target.complete() 
    })
  }, 10000);

  }

  refresh(event) {
    setTimeout(() => {
      this.ngOnInit()
      event.target.complete();
    }, 10000);
  }

}
