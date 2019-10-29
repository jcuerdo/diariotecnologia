import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';

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
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private http: HttpClient)  {

  }

  ngOnInit(){
    let promise = this.http.get(this.baseURl);
    promise.subscribe(data => {
      this.posts = data.posts
      this.page++
      this.searchTerm = data.searchTerm
    })
  }

  nextPage(event){
    setTimeout(() => {
      console.log(this.baseURl + "?page=" + (this.page) )
    let promise = this.http.get(this.baseURl + "?page=" + (this.page) );
    promise.subscribe(data => {
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

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
