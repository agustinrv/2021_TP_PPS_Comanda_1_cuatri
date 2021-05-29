import { Usuario } from 'src/app/clases/Usuario/usuario';
import { Eperfil } from './../../enumerados/Eperfil/eperfil';
export class Supervisor extends Usuario {
    public apellido:string;
    public dni:string;
    public cuil:string;
    public perfil:Eperfil;

}
