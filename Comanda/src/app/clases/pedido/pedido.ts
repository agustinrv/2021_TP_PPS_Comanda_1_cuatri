import { EestadoPedido } from "src/app/enumerados/EestadoPedido/eestado-pedido";
import { Productos } from "../Productos/productos";

export class Pedido {
    public id:string;
    public listaProductos:Productos[];
    public estadoPedido:EestadoPedido;

}
