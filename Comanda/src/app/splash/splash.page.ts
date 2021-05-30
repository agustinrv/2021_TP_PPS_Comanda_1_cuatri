import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private splashscreen : SplashScreen, public router:Router, private platform: Platform) 
  {
    this.initializeApp();
    this.splashAnimado();    
   }



  initializeApp()
  {
  
    this.platform.ready().then(()=>{
      
       setTimeout(()=> {
         this.splashscreen.hide();
       },50);
      
    });
    
    
  }

  splashAnimado()
  {
    setTimeout(()=>{
      this.router.navigate(['login'],{replaceUrl:true});
    },3000);
  }


  ngOnInit() {
  }

}
