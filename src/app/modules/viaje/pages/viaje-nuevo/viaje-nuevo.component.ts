import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { ViajeFormularioComponent } from '../../components/viaje-formulario/viaje-formulario.component';
import { ViajeRepository } from '../../repositories/viaje.repository';
import { AlertaService } from '@app/common/services/alerta.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-viaje-nuevo',
  standalone: true,
  imports: [ViajeFormularioComponent, RouterLink],
  templateUrl: './viaje-nuevo.component.html',
  styleUrl: './viaje-nuevo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ViajeNuevoComponent {
  @ViewChild('viajeFormulario') viajeFormulario!: ViajeFormularioComponent;

  private _viajeRepository = inject(ViajeRepository);
  private _alertaService = inject(AlertaService);
  private _router = inject(Router);

  onSubmit(): void {
    this.viajeFormulario.enviarFormulario();
  }

  guardarViaje(viaje: any): void {
    this._viajeRepository.guardarViaje(viaje).subscribe(() => {
      this._router.navigate(['/transporte/viaje']);
      this._alertaService.mostrarExito('Viaje guardado correctamente');
    });
  }
}
