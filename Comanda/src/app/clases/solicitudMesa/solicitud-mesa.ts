import { EestadoSolicitudMesa } from 'src/app/enumerados/EestadoSolicitudMesa/eestado-solicitud-mesa';
import { EtipoMesa } from './../../enumerados/EtipoMesa/etipo-mesa';
export class SolicitudMesa {
    public id:string;
    public cliente:any;//puede ser cliente o anonimo
    public cantidadDeComensales:number;
    public tipo:EtipoMesa;
    public estadoSolicitud:EestadoSolicitudMesa=EestadoSolicitudMesa.Pendiente;
}
