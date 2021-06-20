import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore/';
import { Injectable } from '@angular/core';
import { Mesa } from 'src/app/clases/Mesa/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  public pathMesa='/Mesas';
  public coleccionMesas:AngularFirestoreCollection<any>;
  public listaMesas:any[]=[];
  
  
  
  constructor(private bd:AngularFirestore) 
  { 
    this.coleccionMesas=this.bd.collection(this.pathMesa);
   
    
 
  }

  public  AgregarUno(nuevaMesa:Mesa)
  {    
    nuevaMesa.id=this.bd.createId();
    this.coleccionMesas.doc(nuevaMesa.id).set({...nuevaMesa});    
  }

  public  TraerTodos()
  {
    return this.coleccionMesas;    
  }

  public TraerOrdenado()
  {
    return this. bd.collection<Mesa>(this.pathMesa, ref => ref.orderBy('numero', 'asc'));
  }

  public ModificarUno(unaMesa)
  {
    return this.coleccionMesas.doc(unaMesa.id).set({...unaMesa});
  }

  
 
  
}
