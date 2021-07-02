import { EtipoMesa } from "src/app/enumerados/EtipoMesa/etipo-mesa";
import { Cliente } from "../Cliente/cliente";

export class Mesa {
    public id:string;
    public cliente:Cliente;
    public numero:number;//es el numero de la mesa,en principio solo se manipula en BD hasta que se creemos el alta
    public cantidadDeComensales:number;
    public tipo:EtipoMesa;
    public asignada:boolean;

}
