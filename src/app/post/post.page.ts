import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  private baseURl = "https://www.diariotecnologia.es/api/"
  private slag = ""
  private post = {}

  constructor(private route: ActivatedRoute, private router: Router, private http : HttpClient) {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('slag'))
      )
    ).subscribe(d => this.slag = d);
  }

  ngOnInit(){
    console.log(this.baseURl + this.slag)
    let promise = this.http.get(this.baseURl + this.slag);
    promise.subscribe(data => {
      this.post = data.post
    })
  }
}
