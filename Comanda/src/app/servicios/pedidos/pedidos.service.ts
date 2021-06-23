import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { EestadoPedido } from 'src/app/enumerados/EestadoPedido/eestado-pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  public pathPedido='/Pedidos';
  public coleccionPedidos:AngularFirestoreCollection<any>;
  public listaPedidos:any[]=[];
  
  
  
  constructor(private bd:AngularFirestore) 
  { 
    this.coleccionPedidos=this.bd.collection(this.pathPedido); 
  }

  public AgregarUno(nuevaPedido:Pedido)
  {    
    nuevaPedido.id=this.bd.createId();
    this.coleccionPedidos.doc(nuevaPedido.id).set({...nuevaPedido});    
  }

  public  TraerTodos()
  {
    return this.coleccionPedidos;    
  }

  public ModificarUno(unaPedido)
  {
    return this.coleccionPedidos.doc(unaPedido.id).set({...unaPedido});
  }

  public BorrarUno(unPedido:Pedido) {
    this.coleccionPedidos.doc(unPedido.id).delete();
  }

  public TraerPedidosRecibidos(){
    return this.bd.collection(this.pathPedido, ref=>ref.where("estadoPedido", "==", EestadoPedido.Recibido));    
  }

  public TraerPedidosPreparando(){
    return this.bd.collection(this.pathPedido, ref=>ref.where("estadoPedido", "==", EestadoPedido.Preparando));    
  }

  public TraerPedidosTerminado(){
    return this.bd.collection(this.pathPedido, ref=>ref.where("estadoPedido", "==", EestadoPedido.Terminado));    
  }

  
}
