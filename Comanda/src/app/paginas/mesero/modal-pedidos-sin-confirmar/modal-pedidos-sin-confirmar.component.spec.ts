import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalPedidosSinConfirmarComponent } from './modal-pedidos-sin-confirmar.component';

describe('ModalPedidosSinConfirmarComponent', () => {
  let component: ModalPedidosSinConfirmarComponent;
  let fixture: ComponentFixture<ModalPedidosSinConfirmarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPedidosSinConfirmarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPedidosSinConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
