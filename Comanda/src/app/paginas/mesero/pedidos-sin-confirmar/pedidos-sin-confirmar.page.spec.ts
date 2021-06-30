import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidosSinConfirmarPage } from './pedidos-sin-confirmar.page';

describe('PedidosSinConfirmarPage', () => {
  let component: PedidosSinConfirmarPage;
  let fixture: ComponentFixture<PedidosSinConfirmarPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosSinConfirmarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidosSinConfirmarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
