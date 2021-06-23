import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class MsgConsultaService {
  //RealTime
  referencia : AngularFireList<any>;
  ref = firebase.default.database().ref("/Chat");


  miChat: any[] = [];

  constructor(private bd: AngularFireDatabase) {
    this.referencia = bd.list("Chat");
  }

  CrearMsgRT(msg : any){
    this.ref.child(msg.fecha).set(msg);
  }

  TraerChat(){
    return this.referencia;
  }

  ModificarMsg(msg:any){
    this.ref.child(msg.fecha).update(msg);
    //return this.referencia.update(msg.fecha,msg);
  }
}
