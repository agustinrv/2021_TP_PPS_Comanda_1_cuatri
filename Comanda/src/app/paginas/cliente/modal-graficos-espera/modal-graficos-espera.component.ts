import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { EncuestaService } from 'src/app/servicios/encuesta/encuesta.service';



@Component({
  selector: 'app-modal-graficos-espera',
  templateUrl: './modal-graficos-espera.component.html',
  styleUrls: ['./modal-graficos-espera.component.scss'],
})
export class ModalGraficosEsperaComponent implements OnInit {

  public listaEncuestas:any[]=[];
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: number[] = [];
  public listaEstadosTurnos:any[]=[];
  public cargo=false;
  public doughnutChartType: ChartType = 'pie';
  public titulo: string;

  
  public options :any = {
   

   plugins: {
     labels: {
       fontSize: 25,
       fontColor: 'white',
       render: 'percentage',
       
     },
   },

   legend: {
     display: true,
      labels:{
          fontSize: 20,
          fontColor: 'white',
          
          
      },
     
   },
   

 };

  constructor(private encuestaSvc:EncuestaService,private modalController:ModalController) { }

  ngOnInit(): void 
  {
    this.graficoPregunta1();
  }

  public CerrarModal() {

    this.modalController.dismiss({
      'dismissed': true,
    });    

  }


    graficoPregunta1()
    {
     this.titulo = "¿Como calificaría la atención y el servicio brindado?"
     
     
     this.encuestaSvc.TraerTodos().valueChanges().subscribe(data=>{

       this.doughnutChartLabels.splice(0, this.doughnutChartLabels.length);
       this.doughnutChartData.splice(0, this.doughnutChartData.length);

         this.doughnutChartLabels.push('Uno');
         this.doughnutChartLabels.push('Dos');
         this.doughnutChartLabels.push('Tres');
         this.doughnutChartLabels.push('Cuatro');
         this.doughnutChartLabels.push('Cinco');
 

       let listaUno:any[]=[];
       let listaDos:any[]=[];
       let listaTres:any[]=[];
       let listaCuatro:any[]=[];
       let listaCinco:any[]=[];
 
       data.forEach(value=>{
           
             switch (value.pregunta1) {
 
              case 1:  
                   listaUno.push(value.pregunta1);
                break;
              case 2:  
                   listaDos.push(value.pregunta1);
                 break;
              case 3:  
                   listaTres.push(value.pregunta1);
                 break;
              case 4:  
                   listaCuatro.push(value.pregunta1);
                 break;
              case 5:  
                   listaCinco.push(value.pregunta1);
                 break;            
             }
        });
 
         
         this.doughnutChartData.push(listaUno.length);
         this.doughnutChartData.push(listaDos.length);
         this.doughnutChartData.push(listaTres.length);
         this.doughnutChartData.push(listaCuatro.length);
         this.doughnutChartData.push(listaCinco.length);
         this.cargo=true;
       
       });
 
         
         

    }


    graficoPregunta2()
    {
      this.titulo = "¿Como fue su experiencia con nuestra aplicación?"
      
      this.encuestaSvc.TraerTodos().valueChanges().subscribe(data=>{
       this.doughnutChartLabels.splice(0, this.doughnutChartLabels.length);
       this.doughnutChartData.splice(0, this.doughnutChartData.length);

         this.doughnutChartLabels.push('Excelente');
         this.doughnutChartLabels.push('Buena');
         this.doughnutChartLabels.push('Mala');

       

       let listaExcelente:any[]=[];
       let listaBuena:any[]=[];
       let listaMala:any[]=[];
     
       data.forEach(value=>{
           
             switch (value.pregunta2) {
 
              case 'Excelente':  
                   listaExcelente.push(value.pregunta2);
                break;
              case 'Buena':  
                   listaBuena.push(value.pregunta2);
                 break;
              case 'Mala':  
                   listaMala.push(value.pregunta2);
                 break;        
             }
        });
        
 
         
         this.doughnutChartData.push(listaExcelente.length);
         this.doughnutChartData.push(listaBuena.length);
         this.doughnutChartData.push(listaMala.length);
         
         this.cargo=true;
       
       });
         
 
    }





    graficoPregunta3()
    {
     this.titulo = "¿Recomendaría nuestro restaurante a otras personas?"
     
     
     this.encuestaSvc.TraerTodos().valueChanges().subscribe(data=>{

       this.doughnutChartLabels.splice(0, this.doughnutChartLabels.length);
       this.doughnutChartData.splice(0, this.doughnutChartData.length);

       this.doughnutChartLabels.push('Si');
       this.doughnutChartLabels.push('No');

       let listaSi:any[]=[];
       let listaNo:any[]=[];
     
       data.forEach(value=>{
           
             switch (value.pregunta3) {
 
              case 'si':  
                  listaSi.push(value.pregunta3);
                break;
              case 'no':  
                  listaNo.push(value.pregunta3);
                 break;    
             }
        });
 
         
         this.doughnutChartData.push(listaSi.length);
         this.doughnutChartData.push(listaNo.length);
         
         this.cargo=true;
       
       });
 
         
         
 
    }

    graficoPregunta4()
    {
     this.titulo = "¿Que fue lo que más le gustó de nuestro menu?"
     
     
     this.encuestaSvc.TraerTodos().valueChanges().subscribe(data=>{

       this.doughnutChartLabels.splice(0, this.doughnutChartLabels.length);
       this.doughnutChartData.splice(0, this.doughnutChartData.length);

       this.doughnutChartLabels.push('Comidas');
       this.doughnutChartLabels.push('Postres');
       this.doughnutChartLabels.push('Tragos');

       let listaComidas:any[]=[];
       let listaPostres:any[]=[];
       let listaTragos:any[]=[];
     
       data.forEach(value=>{
           
           if(value.pregunta4!=null)
           {
              if(value.pregunta4.comidas == true)
              {
                listaComidas.push(value.pregunta4.comidas);
              }
              if(value.pregunta4.postres == true)
              {
                listaPostres.push(value.pregunta4.postres);
              }
              if(value.pregunta4.tragos == true)
              {
                listaTragos.push(value.pregunta4.tragos);
              }
           }
        });
 
         
         this.doughnutChartData.push(listaComidas.length);
         this.doughnutChartData.push(listaPostres.length);
         this.doughnutChartData.push(listaTragos.length);
         
         this.cargo=true;
       
       });
 
         
         
 
    }


  

  selectCategoria(e)
  {
   let categoria = e.detail.value;
   

   switch(categoria)
   {
     case '1':
       this.graficoPregunta1();
       break;
     case '2':
       this.graficoPregunta2();
       break;
     case '3':
       this.graficoPregunta3();
       break;
     case '4':
       this.graficoPregunta4();
       break;

       default:
         break;
   }
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
