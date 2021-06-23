import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router:Router, public platform : Platform) 
  {
     this.initializeApp();
     this.splashAnimado();    
   }



   initializeApp()
   {
  
     this.platform.ready().then(()=>{
     
        setTimeout(()=> {
          SplashScreen.hide()
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
    // SplashScreen.hide()
    // setTimeout(()=>{
    //   this.router.navigate(['login'],{replaceUrl:true});
    // },3500)
  }

}
