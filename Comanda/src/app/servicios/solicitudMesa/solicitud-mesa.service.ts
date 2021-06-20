import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SolicitudMesa } from 'src/app/clases/solicitudMesa/solicitud-mesa';
import { EestadoSolicitudMesa } from 'src/app/enumerados/EestadoSolicitudMesa/eestado-solicitud-mesa';

@Injectable({
  providedIn: 'root'
})
export class SolicitudMesaService {
  public pathSolicitudMesa='/SolicitudesMesas';
  public coleccionSolicitudMesas:AngularFirestoreCollection<any>;
  public listaSolicitudMesas:any[]=[];
  
  
  
  constructor(private bd:AngularFirestore) 
  { 
    this.coleccionSolicitudMesas=this.bd.collection(this.pathSolicitudMesa);
    
    this.TraerTodos().valueChanges().subscribe((data)=>{
      
   
      this.listaSolicitudMesas=data;
    });
  }

  public AgregarUno(nuevoSolicitudMesa:SolicitudMesa)
  {    
    nuevoSolicitudMesa.id=this.bd.createId();
    return this.coleccionSolicitudMesas.doc(nuevoSolicitudMesa.id).set({...nuevoSolicitudMesa});
  }

  public  TraerTodos()
  {
    return this.coleccionSolicitudMesas;    
  }

  public TraerUno(correo)
  {
    
    return this.bd.collection(this.pathSolicitudMesa, ref=>ref.where("cliente.correo", "==", correo ));    
  }

  public TraerSolicitudesPendientes() {
    return this.bd.collection(this.pathSolicitudMesa, ref=>ref.where("estadoSolicitud", "==", EestadoSolicitudMesa.Pendiente ));    
  }

  public ModificarUno(unSolicitudMesa)
  {
    return this.coleccionSolicitudMesas.doc(unSolicitudMesa.id).set({...unSolicitudMesa});
  }

  public BorrarUno(unaSolicitud:SolicitudMesa) {
    this.coleccionSolicitudMesas.doc(unaSolicitud.id).delete();
  }

  public BorrarTodos()
  {
      this.listaSolicitudMesas.forEach((element)=>{
        this.BorrarUno(element);
      })
  }

}
