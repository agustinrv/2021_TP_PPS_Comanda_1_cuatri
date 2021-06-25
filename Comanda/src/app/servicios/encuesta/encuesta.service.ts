import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore/';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  public pathEncuesta = '/encuestas';
  public coleccionEncuesta: AngularFirestoreCollection<any>;
  public listaEncuestas;

  constructor(private bd: AngularFirestore,private router:Router) {

    this.coleccionEncuesta = this.bd.collection(this.pathEncuesta);
   }


  public AgregarEncuesta(encuesta: any) {

    this.coleccionEncuesta.add({ ...encuesta });
    
  }

  public TraerTodos() {
    return this.coleccionEncuesta;
  }

  

}
