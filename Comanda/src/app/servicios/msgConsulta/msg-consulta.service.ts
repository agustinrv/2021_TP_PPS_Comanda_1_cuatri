import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class MsgConsultaService {
  //RealTime
  referencia : AngularFireList<any>;

  miChat: any[] = [];

  constructor(private bd: AngularFireDatabase) {
    this.referencia = bd.list("Chat");
  }

  CrearMsgRT(msg : any){
    return this.referencia.push(msg);
  }

  TraerChat(){
    return this.referencia;
  }
}
