import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Colors, Label, SingleDataSet } from 'ng2-charts';
import { EncuestaService } from 'src/app/servicios/encuesta/encuesta.service';


@Component({
  selector: 'app-graficos-cliente',
  templateUrl: './graficos-cliente.page.html',
  styleUrls: ['./graficos-cliente.page.scss'],
})
export class GraficosClientePage implements OnInit {

   public listaEncuestas:any[]=[];
   public cargo=false;
   public pieChartType : ChartType = "pie";
   public barChartType : ChartType = "bar";
   public titulo: string;
   public cambiarChart : boolean = false;

   //pieChart
   public pieChartLabels: Label[] = [];
   public pieChartData: SingleDataSet = [];
   
  //barChart   
   public barChartData: SingleDataSet = [];
   public barChartLabels: Label[] = [];

   // colores en orden
   public pieChartColors: Array<any> = [
    { 
      backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56','#4bc0c0','#ff9f40']
    }
   ]

   public barChartColors: Array<any> = [
    { 
      backgroundColor: ['#36a2eb','#ff6384', '#ffcd56','#4bc0c0','#ff9f40']
    }
   ]
   
   public optionsPie:any = {

  
    
    plugins: {
      labels: {
        fontSize: 30,
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

  public optionsBar:any = {

    plugins: {
      labels: {
        fontSize: 30,
        fontColor: 'white',
        render: 'value',
        
      },
    },
    
    legend: {
      display: false,
       labels:{
           fontSize: 20,
           fontColor: 'white',
                
       },
    },
    scales: {
      xAxes: [{
        ticks: { fontColor: 'white',fontSize:20, beginAtZero:true },
        
      }],
      yAxes: [{
        ticks: { fontColor: 'white', fontSize:20,beginAtZero:true  },
        
      }]
    }
  };

   constructor(private encuestaSvc:EncuestaService) { }
 
   ngOnInit(): void 
   {
     this.graficoPregunta1();
   }


     graficoPregunta1()
     {
      this.titulo = "¿Como calificaría la atención y el servicio brindado?"
      this.pieChartType = "pie";
      this.cambiarChart = false;

      this.encuestaSvc.TraerTodos().valueChanges().subscribe(data=>{

        this.pieChartLabels.splice(0,this.pieChartLabels.length);
        this.pieChartData.splice(0,this.pieChartData.length);
        

          this.pieChartLabels.push('Uno');
          this.pieChartLabels.push('Dos');
          this.pieChartLabels.push('Tres');
          this.pieChartLabels.push('Cuatro');
          this.pieChartLabels.push('Cinco');
  

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
  
           this.pieChartData.push(listaUno.length);
           this.pieChartData.push(listaDos.length);
           this.pieChartData.push(listaTres.length);
           this.pieChartData.push(listaCuatro.length);
           this.pieChartData.push(listaCinco.length);
          this.cargo=true;
          
        
        });
  
          
          

     }


     graficoPregunta2()
     {
       this.titulo = "¿Como fue su experiencia con nuestra aplicación?"
       this.barChartType = "horizontalBar";
       this.cambiarChart = true;

       this.encuestaSvc.TraerTodos().valueChanges().subscribe(data=>{
        
        this.barChartLabels.splice(0,this.barChartLabels.length);
        this.barChartData.splice(0,this.barChartData.length);
        


          this.barChartLabels.push('Excelente');
          this.barChartLabels.push('Buena');
          this.barChartLabels.push('Mala');

        

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
         
          this.barChartData.push(listaExcelente.length);
          this.barChartData.push(listaBuena.length);
          this.barChartData.push(listaMala.length);
          
  
          
          this.cargo=true;
        
        });
          
  
     }





     graficoPregunta3()
     {
      this.titulo = "¿Recomendaría nuestro restaurante a otras personas?"
      this.barChartType = "bar";
      this.cambiarChart = true;

      this.encuestaSvc.TraerTodos().valueChanges().subscribe(data=>{

        this.barChartLabels.splice(0,this.barChartLabels.length);
        this.barChartData.splice(0,this.barChartData.length);

        

        this.barChartLabels.push('Si');
        this.barChartLabels.push('No');

        let listaSi:number[]=[];
        let listaNo:number[]=[];
      
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
  
          
         
          
          this.barChartData.push(listaSi.length);
          this.barChartData.push(listaNo.length);

          this.cargo=true;
        
        });
  
          
          
  
     }

     graficoPregunta4()
     {
      this.titulo = "¿Que fue lo que más le gustó de nuestro menu?"
      this.pieChartType = "doughnut";
      this.cambiarChart = false;

      this.encuestaSvc.TraerTodos().valueChanges().subscribe(data=>{

        this.pieChartLabels.splice(0,this.pieChartLabels.length);
        this.pieChartData.splice(0,this.pieChartData.length);
   

        this.pieChartLabels.push('Comidas');
        this.pieChartLabels.push('Postres');
        this.pieChartLabels.push('Tragos');

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
  
          
          this.pieChartData.push(listaComidas.length);
          this.pieChartData.push(listaPostres.length);
          this.pieChartData.push(listaTragos.length);
          
          this.cargo=true;
        
        });
  
          
          
  
     }


   

   selectCategoria(e)
   {
    let categoria = e.detail.value;
    

    switch(categoria)
    {
      case '1':
        this.barChartLabels.splice(0,this.barChartLabels.length);
        this.barChartData.splice(0,this.barChartData.length);
        this.graficoPregunta1();
        break;
      case '2':
        this.pieChartLabels.splice(0,this.pieChartLabels.length);
        this.pieChartData.splice(0,this.pieChartData.length);
        this.graficoPregunta2();
        break;
      case '3':
        this.pieChartLabels.splice(0,this.pieChartLabels.length);
        this.pieChartData.splice(0,this.pieChartData.length);
        this.graficoPregunta3();
        break;
      case '4':
        this.barChartLabels.splice(0,this.barChartLabels.length);
        this.barChartData.splice(0,this.barChartData.length);
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
