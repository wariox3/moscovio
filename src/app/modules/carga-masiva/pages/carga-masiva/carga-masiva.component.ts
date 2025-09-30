import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { ViajeFormularioComponent } from '@app/modules/viaje/components/viaje-formulario/viaje-formulario.component';
import { ViajeCardComponent } from '@app/modules/viaje/components/viaje-card/viaje-card.component';
import { CommonModule } from '@angular/common';
import { ViajeRepository } from '@app/modules/viaje/repositories/viaje.repository';
import { Viaje } from '@app/modules/viaje/interfaces/viaje.interface';
import { AlertaService } from '@app/common/services/alerta.service';
import { switchMap } from 'rxjs';
import { NegocioRepository } from '@app/common/repositories/transporte/negocio.repository';

@Component({
  selector: 'app-carga-masiva',
  standalone: true,
  imports: [ViajeFormularioComponent, ViajeCardComponent, CommonModule],
  templateUrl: './carga-masiva.component.html',
  styleUrl: './carga-masiva.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CargaMasivaComponent implements OnInit {
  private _viajeRepository = inject(ViajeRepository);
  private _negocioRepository = inject(NegocioRepository);
  private _alertaService = inject(AlertaService);

  public viajes = signal<Viaje[]>([]);

  ngOnInit(): void {
    this.cargarViajes();
  }

  cargarViajes() {
    this._viajeRepository
      .getViajes({ estado_cancelado: 'False', solicitud_cliente: 'True' })
      .subscribe(response => {
        this.viajes.set(response.viajes);
      });
  }

  onViajeGuardado(viaje: any) {
    this._viajeRepository.guardarViaje(viaje).subscribe(() => {
      this._alertaService.mostrarExito('Viaje publicado correctamente');
      this.cargarViajes(); // Recargar la lista de viajes
    });
  }

  aceptarPropuesta({ propuestaId }: { propuestaId: number; viajeId: number }): void {
    this._viajeRepository
      .aceptarPropuesta(propuestaId)
      .pipe(
        switchMap(response => {
          return this._negocioRepository.nuevoViaje(
            propuestaId,
            response.propuesta.viaje,
            response.propuesta.schema_name
          );
        })
      )
      .subscribe(() => {
        this.cargarViajes();
        this._alertaService.mostrarExito('Viaje aprobado');
      });
  }

  eliminarViaje(viajeId: number): void {
    this._viajeRepository.eliminarViaje(viajeId).subscribe(() => {
      this.cargarViajes();
      this._alertaService.mostrarExito('Viaje eliminado');
    });
  }

  cancelarViaje(viajeId: number): void {
    this._viajeRepository.cancelarViaje(viajeId).subscribe(() => {
      this.cargarViajes();
      this._alertaService.mostrarExito('Viaje cancelado');
    });
  }
}
