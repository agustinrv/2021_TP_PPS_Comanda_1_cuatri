import { Component, OnInit } from '@angular/core';
import { Piece } from 'src/app/servicios/juegos/tateti.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { TatetiService } from 'src/app/servicios/juegos/tateti.service';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { MesaService } from 'src/app/servicios/mesa/mesa.service';
import { take } from 'rxjs/operators';
import { Mesa } from 'src/app/clases/Mesa/mesa';


@Component({
  selector: 'app-juego-tateti',
  templateUrl: './juego-tateti.page.html',
  styleUrls: ['./juego-tateti.page.scss'],
})
export class JuegoTatetiPage implements OnInit {

  private currentPlayer: Piece;
  private player: Piece = Piece.X;
  gameOver: boolean;
  board: Piece[][];
  statusMessage: string;
  aiLevelEasy = true;

  //puntos jugador
  playerScore : number=0;
  aiScore : number=0;

  usuarioLogeado: string;
  mesa : Mesa;
 

  constructor(private readonly svc: TatetiService, private authSvc: AuthService, private mesaSvc : MesaService)
  {
    
  }

  

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('usuarioLogeado'));
    this.usuarioLogeado = user.correo;
    console.log(this.usuarioLogeado);
    
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

  choosePlayer(checked: boolean) {
    this.player = checked ? Piece.X : Piece.O;
  }
  

  newGame() {
    this.currentPlayer = Piece.X;
    this.gameOver = false;
    this.board = [
      [Piece.EMPTY, Piece.EMPTY, Piece.EMPTY],
      [Piece.EMPTY, Piece.EMPTY, Piece.EMPTY],
      [Piece.EMPTY, Piece.EMPTY, Piece.EMPTY]
    ];

    this.statusMessage = `Turno de ${this.currentPlayer}`;
    if (this.player !== this.currentPlayer) {
      this.aiTurn();
    }

    
    
    
  }

  resetScore()
  {
    this.aiScore = 0;
    this.playerScore = 0;
  }

  move(row: number, col: number) 
  {
    if (!this.gameOver && this.board[row][col] === Piece.EMPTY) 
    {
      this.board[row][col] = this.currentPlayer;
      
      if (this.svc.isDraw(this.board)) 
      {
        this.statusMessage = `Es un empate`;
        this.gameOver = true;
        
        if(!this.mesa.juego2)
        {
            Swal.fire('Buen intento!','No pudo ganar el premio, la proxima vez será','error');
            this.mesa.juego2 = true;
            this.mesaSvc.ModificarUno(this.mesa);
        }
      } 
      else if (this.svc.isWin(this.board)) 
      {
        this.statusMessage = `Gano Jugador ${this.currentPlayer}!`;
        
        if(this.currentPlayer == this.player)
        {
          this.playerScore++;
          if(!this.mesa.juego2)
          {
            Swal.fire('Felicidades!','Ganó una bebida gratis!','success');
            this.mesa.juego2 = true;
            this.mesa.gano2 = true;
            this.mesaSvc.ModificarUno(this.mesa);
            
          }
          
        }
        else
        {
          this.aiScore++;
          if(!this.mesa.juego2)
          {
            Swal.fire('Buen intento!','No pudo ganar el premio, la proxima vez será','error');
            this.mesa.juego2 = true;
            this.mesaSvc.ModificarUno(this.mesa);
          }
          
        }
        this.gameOver = true;
      } 
      else 
      {
        this.currentPlayer = this.currentPlayer === Piece.O ? Piece.X : Piece.O;
        this.statusMessage = `Turno de ${this.currentPlayer}`;
        if (this.currentPlayer !== this.player) {
          this.aiTurn();
        }
      }
    }
  }

  aiTurn() {
    const emptyCells = this.svc.countOfEmptyCells(this.board);
    if (emptyCells === 9) {
      this.move(Math.floor(Math.random() * 3), Math.floor(Math.random() * 3));
    } else {
      const bestMove = this.svc.minimax(
        this.board,
        this.aiLevelEasy && emptyCells > 5 ? 5 : emptyCells,
        this.player !== Piece.X
      );
      this.move(bestMove.row, bestMove.col);
    }
  }


  private logBoard() {
    for (let row = 0; row < this.board.length; row++) {
      console.log(this.board[row]);
    }
  }

  


}
