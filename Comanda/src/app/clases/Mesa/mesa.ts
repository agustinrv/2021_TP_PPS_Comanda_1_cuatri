import { EtipoMesa } from "src/app/enumerados/EtipoMesa/etipo-mesa";
import { Cliente } from "../Cliente/cliente";

export class Mesa {
    public id:string;
    public cliente:Cliente;//o correo
    public numero:number;//es el numero de la mesa,en principio solo se manipula en BD hasta que se creemos el alta
    public cantidadDeComensales:number;
    public tipo:EtipoMesa;
    public asignada:boolean;

    //juegos
    public juego1 : boolean = false; //adivinar numero (Si es true: jugó una vez)
    public gano1 : boolean = false; //si es true: 10% descuento en precio total de la compra

    public juego2 : boolean = false; //tateti (Si es true: jugó una vez)
    public gano2 : boolean = false; //una bebida gratis (si es true: se descuenta de la compra si es que pidio bebida)

    public juego3 : boolean = false; //piedra papel tijera (Si es true: jugó una vez)
    public gano3 : boolean = false; //un postre gratis (si es true: se descuenta de la compra si es que pidio postre)
}
