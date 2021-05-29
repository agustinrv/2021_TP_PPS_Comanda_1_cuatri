import { Usuario } from 'src/app/clases/Usuario/usuario';
import { Eperfil } from './../../enumerados/Eperfil/eperfil';
export class Cliente extends Usuario{
    public apellido:string;
    public dni:string;
    public perfil:Eperfil=Eperfil.Cliente;


}
