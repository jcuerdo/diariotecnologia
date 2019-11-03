import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdMobFreeInterstitialConfig, AdMobFree, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private posts = [];
  private page = 0;
  private searchTerm = "";
  private baseURl = "https://www.diariotecnologia.es/api/";
  private idAd = "ca-app-pub-6904186947817626/4310930274";
  private idVideoAdd = "ca-app-pub-6904186947817626/2154931416"

  constructor(private http: HttpClient, private admobFree: AdMobFree
    )  {
  }

  ngOnInit(){
    this.loadPosts(false);
  }

  loadPosts(event){
    let promise = this.http.get(this.baseURl + "?page=" + this.page );
    promise.subscribe((data : any) => {
      this.posts = data.posts
      this.page++
      this.searchTerm = data.searchTerm
      if(event){
        event.target.complete();
      }
    })
  }

  loadMorePosts(event){
    let promise = this.http.get(this.baseURl + "?page=" + this.page );
    promise.subscribe((data : any) => {
      this.posts = this.posts.concat(data.posts)
      this.page++
      this.searchTerm = data.searchTerm
      if(event){
        event.target.complete();
      }
    })
  }

  nextPage(event){
    this.showAd();
    this.loadMorePosts(event);

  }

  refresh(event) {
    this.showAd();
    this.page = 0;
    this.loadPosts(event);
  }

  showAd(){
    this.showInterstitialAds();
  }

  generateRandom(min : number,max : number) : number{
    let random = Math.round(Math.random() * (+max - +min) + +min); 
    console.log("Random number generated: " + random)
    return random;
  }

  showInterstitialAds(){
    console.log("showInterstitialAds")

    let interstitialConfig: AdMobFreeInterstitialConfig = {
        isTesting: false, // Remove in production
        autoShow: false,
        id: this.idAd
    };
    this.admobFree.interstitial.config(interstitialConfig);

    this.admobFree.on(this.admobFree.events.INTERSTITIAL_LOAD).subscribe(() => {
      this.admobFree.interstitial.show().then(() => {
          console.log('shown')
      }).catch((errorShow) => {
        console.log('errror shown')
        console.log(errorShow)
      });
   });
   
   this.admobFree.on(this.admobFree.events.INTERSTITIAL_LOAD_FAIL).subscribe((e) => {
    console.log('on load fail')
    console.log(e)
   });


   this.admobFree.interstitial.prepare().then(() => {
    console.log('prepared')
  }).catch(e => {
    console.log('fail prepared')
    console.log(e)
  });
   
}

showVideoAds(){
  console.log("showVideoAds")
  let videoConfig: AdMobFreeRewardVideoConfig = {
      isTesting: false, // Remove in production
      autoShow: false,
      id: this.idVideoAdd
  };
  this.admobFree.rewardVideo.config(videoConfig);

  this.admobFree.on(this.admobFree.events.REWARD_VIDEO_LOAD).subscribe(() => {
    this.admobFree.rewardVideo.show().then(() => {
        console.log('shown')
    }).catch((errorShow) => {
      console.log('errror shown')
      console.log(errorShow)
    });
 });
 
 this.admobFree.on(this.admobFree.events.REWARD_VIDEO_LOAD_FAIL).subscribe((e) => {
  console.log('on load fail')
  console.log(e)
 });


 this.admobFree.rewardVideo.prepare().then(() => {
  console.log('prepared')
}).catch(e => {
  console.log('fail prepared')
  console.log(e)
});
 
}

}
