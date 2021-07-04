import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalGraficosEsperaComponent } from './modal-graficos-espera.component';

describe('ModalGraficosEsperaComponent', () => {
  let component: ModalGraficosEsperaComponent;
  let fixture: ComponentFixture<ModalGraficosEsperaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGraficosEsperaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalGraficosEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
