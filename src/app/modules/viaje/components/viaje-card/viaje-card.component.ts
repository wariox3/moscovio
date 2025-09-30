import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { DatePipe, DecimalPipe, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Viaje } from '../../interfaces/viaje.interface';
import { EstadoBadgeComponent } from '@tamerlantian/ui-components';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../../modules/auth/store/selectors/auth.selector';

@Component({
  selector: 'app-viaje-card',
  standalone: true,
  imports: [DatePipe, DecimalPipe, RouterLink, EstadoBadgeComponent, AsyncPipe],
  templateUrl: './viaje-card.component.html',
  styleUrl: './viaje-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViajeCardComponent {
  @Input() viaje!: Viaje;
  @Output() propuestaAceptada = new EventEmitter<{ propuestaId: number; viajeId: number }>();
  @Output() eliminarViaje = new EventEmitter<number>();
  @Output() cancelarViaje = new EventEmitter<number>();

  private store = inject(Store);
  currentUser$ = this.store.select(selectCurrentUser);

  aceptarPropuesta(propuestaId: number, viajeId: number): void {
    this.propuestaAceptada.emit({ propuestaId, viajeId });
  }

  eliminar(viajeId: number): void {
    this.eliminarViaje.emit(viajeId);
  }

  cancelar(viajeId: number): void {
    this.cancelarViaje.emit(viajeId);
  }
}
