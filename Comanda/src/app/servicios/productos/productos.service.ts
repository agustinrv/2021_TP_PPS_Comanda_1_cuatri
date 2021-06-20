import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  public pathProductos = '/Productos';
  public coleccionProductos:AngularFirestoreCollection<any>;
  public listaProductos :any[]=[];
  
  
  
  constructor(private bd:AngularFirestore) 
  { 
    this.coleccionProductos = this.bd.collection(this.pathProductos);
    
    this.TraerTodos().valueChanges().subscribe((data)=>{
      this.listaProductos = data;
    });
  }

  public TraerTodos()
  {
    return this.coleccionProductos;    
  }

}
