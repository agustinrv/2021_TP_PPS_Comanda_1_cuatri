import { Usuario } from 'src/app/clases/Usuario/usuario';
import { Eperfil } from './../../enumerados/Eperfil/eperfil';
export class Empleado extends Usuario{
    public apellido:string;
    public dni:string;
    public cuil:string;
    public tipoEmpleado:string;
    public perfil:Eperfil=Eperfil.Empleado;
}
