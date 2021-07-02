import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Mesa } from 'src/app/clases/Mesa/mesa';
import { MesaService } from 'src/app/servicios/mesa/mesa.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-juego-ppt',
  templateUrl: './juego-ppt.page.html',
  styleUrls: ['./juego-ppt.page.scss'],
})
export class JuegoPptPage implements OnInit {

  scores = [0 , 0]; 
  weapons = [
    'rock',
    'paper',
    'scissors'
  ];  
  playerSelected = -1;
  enemySelected  = -1;
  loading= false; 
  isResultShow = false;

  theResult = 0 

  isClicked : boolean = false;

  usuarioLogeado : string;
  mesa : Mesa;





  constructor(private mesaSvc : MesaService ) { }


  pick( weapon: number): void {
    
    if(this.loading) return;
    this.loading = true;
    this.playerSelected = weapon;
   
   
    setTimeout( () => {
      this.loading = false;
    
      const randomNum =  Math.floor(Math.random() * 3 ) ;
      this.enemySelected = randomNum;
      this.checkResult();
      this.isResultShow = true;
    },  Math.floor(Math.random()  * 500 ) +200);
  }
 
  reset(): void {
   this.scores = [0,0];
   this.playerSelected = -1;
   this.enemySelected = -1;
   this.theResult = -1;
  }

  checkResult(): void {
    const playerPick = this.playerSelected;
    const enemyPick = this.enemySelected;
   // if you and the enemy have the same weapon, then it is a tie.
    if( playerPick ==  enemyPick)
     {
     this.theResult = 2;
   }
   
     else if ( (playerPick - enemyPick + 3)% 3 == 1)    {
       // YOU WIN
       this.theResult = 0;
       this.scores[0] = this.scores[0]+1;

       if(!this.mesa.juego3)
       {
        this.mesa.juego3 = true;
        this.mesa.gano3 = true;
        this.mesaSvc.ModificarUno(this.mesa);
        Swal.fire('Felicidades!','Ganó un postre gratis!','success');
        
       }
     }
     else{
       // YOU LOSE
       this.theResult = 1;
         this.scores[1] = this.scores[1]+1;

         if(!this.mesa.juego3)
         {
          this.mesa.juego3 = true;
          this.mesaSvc.ModificarUno(this.mesa);
          Swal.fire('Buen intento!','No pudo ganar el premio, la proxima vez será','error');
         }
     }
  }

 
  

  ngOnInit(): void {

    let user = JSON.parse(localStorage.getItem('usuarioLogeado'));
    this.usuarioLogeado = user.correo;
    
    this.mesaSvc.TraerTodos().valueChanges().pipe(take(1)).subscribe(mesa=>{
      mesa.forEach((element:any)=>{
        
        if(element.cliente.correo == this.usuarioLogeado) 
        {
            this.mesa = element;
            
            console.log(element.cliente.correo);
            
        }
      })
    })
    
  }

}
