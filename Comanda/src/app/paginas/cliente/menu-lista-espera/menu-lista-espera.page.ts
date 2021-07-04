import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lista-espera',
  templateUrl: './menu-lista-espera.page.html',
  styleUrls: ['./menu-lista-espera.page.scss'],
})
export class MenuListaEsperaPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  public Volver()
  {

  }

  public SolicitarMesa()
  {
    this.router.navigateByUrl('solicitudes-mesas');
  }

  public VerEstadisticas()
  {
    this.router.navigateByUrl('alta-cliente');
  }

  

}
