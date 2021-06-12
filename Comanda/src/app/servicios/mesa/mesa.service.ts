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
    
    this.TraerTodos().valueChanges().subscribe((data)=>{
      
      this.listaMesas=data;
      
    });
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

  public ModificarUno(unaMesa)
  {
    return this.coleccionMesas.doc(unaMesa.id).set({...unaMesa});
  }
}
