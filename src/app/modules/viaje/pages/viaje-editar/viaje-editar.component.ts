import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { ViajeFormularioComponent } from '../../components/viaje-formulario/viaje-formulario.component';
import { ViajeRepository } from '../../repositories/viaje.repository';
import { AlertaService } from '@app/common/services/alerta.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { ViajeDetalle } from '../../interfaces/viaje.interface';

@Component({
  selector: 'app-viaje-editar',
  standalone: true,
  imports: [ViajeFormularioComponent, RouterLink],
  templateUrl: './viaje-editar.component.html',
  styleUrl: './viaje-editar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ViajeEditarComponent implements OnInit {
  @ViewChild('viajeFormulario') viajeFormulario!: ViajeFormularioComponent;

  private _viajeRepository = inject(ViajeRepository);
  private _alertaService = inject(AlertaService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  viajeId: number | null = null;
  viajeDatos = signal<ViajeDetalle | null>(null);
  cargando = signal(true);

  ngOnInit(): void {
    this._route.params
      .pipe(
        switchMap(params => {
          this.viajeId = +params['id'];
          return this._viajeRepository.getViajeById(this.viajeId);
        })
      )
      .subscribe({
        next: response => {
          this.viajeDatos.set(response);
          this.cargando.set(false);
        },
        error: () => {
          this._alertaService.mostrarError('Error al cargar el viaje');
          this._router.navigate(['/transporte/viaje']);
        },
      });
  }

  onSubmit(): void {
    this.viajeFormulario.enviarFormulario();
  }

  actualizarViaje(viaje: any): void {
    if (!this.viajeId) return;

    this._viajeRepository.actualizarViaje(this.viajeId, viaje).subscribe({
      next: () => {
        this._router.navigate(['/transporte/viaje']);
        this._alertaService.mostrarExito('Viaje actualizado correctamente');
      },
      error: () => {
        this._alertaService.mostrarError('Error al actualizar el viaje');
      },
    });
  }
}
