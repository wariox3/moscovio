import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViajeFormularioComponent } from '@app/modules/viaje/components/viaje-formulario/viaje-formulario.component';

@Component({
  selector: 'app-carga-masiva',
  standalone: true,
  imports: [ViajeFormularioComponent],
  templateUrl: './carga-masiva.component.html',
  styleUrl: './carga-masiva.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CargaMasivaComponent {}
