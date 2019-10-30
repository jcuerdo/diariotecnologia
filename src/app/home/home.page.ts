import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdMobFreeInterstitialConfig, AdMobFree } from '@ionic-native/admob-free/ngx';

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

  constructor(private http: HttpClient, private admobFree: AdMobFree
    )  {

  }

  ngOnInit(){
    this.loadPosts(0)
    this.showInterstitialAds()
  }

  loadPosts(page){
    let promise = this.http.get(this.baseURl + "?page=" + page );
    promise.subscribe((data : any) => {
      this.posts = data.posts
      this.page++
      this.searchTerm = data.searchTerm
    })
  }

  nextPage(event){
    setTimeout(() => {
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
      this.loadPosts(0)
      event.target.complete();
    }, 10000);
  }

  showInterstitialAds(){
    let interstitialConfig: AdMobFreeInterstitialConfig = {
        isTesting: true, // Remove in production
        autoShow: true,
        id: "ca-app-pub-6904186947817626/4310930274"
    };
    this.admobFree.interstitial.config(interstitialConfig);
    this.admobFree.interstitial.prepare().then(() => {
    }).catch(e => alert(e));
}

}
