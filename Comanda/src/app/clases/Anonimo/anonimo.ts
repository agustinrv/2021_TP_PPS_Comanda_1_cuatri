import { Usuario } from 'src/app/clases/Usuario/usuario';
import { Eperfil } from "src/app/enumerados/Eperfil/eperfil";

export class Anonimo extends Usuario{

    public perfil:Eperfil=Eperfil.Anonimo
}
