import { Eperfil } from './../../enumerados/Eperfil/eperfil';
import { Usuario } from 'src/app/clases/Usuario/usuario';
export class Dueño extends Usuario {
    public apellido:string;
    public dni:string;
    public cuil:string;
    public perfil:Eperfil=Eperfil.Dueño;


}
