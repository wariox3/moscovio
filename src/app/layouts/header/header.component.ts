import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, OnInit, inject } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '@app/modules/auth/store/selectors/auth.selector';
import { Usuario } from '@app/modules/auth/interfaces/usuario.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenuComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @HostBinding('class') hostClass =
    'fixed top-0 px-7 z-10 left-0 right-0 flex items-stretch shrink-0 bg-[#fefefe] dark:bg-coal-500 shadow-sm dark:border-b dark:border-b-coal-100';
  @HostBinding('attr.role') hostRole = 'banner';
  @HostBinding('attr.data-sticky') dataSticky = 'true';
  @HostBinding('attr.data-sticky-name') dataStickyName = 'header';
  @HostBinding('id') hostId = 'header';

  private store = inject(Store);

  // Usuario actual
  currentUser$: Observable<Usuario | null>;
  userName: string = 'Hola!';
  userEmail: string = '';
  userImage: string =
    'https://semanticadesarrollo.tor1.digitaloceanspaces.com/itrio/usuario_defecto.jpg';

  public menuItems: any[] = [
    // {
    //   titulo: 'Perfil',
    //   icono: 'ki-filled ki-user',
    //   link: '/perfil',
    // },
  ];
  ngOnInit(): void {
    // Obtener el usuario actual del store
    this.currentUser$ = this.store.select(selectCurrentUser);

    // Suscribirse para actualizar los datos del usuario
    this.currentUser$.subscribe(user => {
      if (user) {
        // Usar nombre y apellido si están disponibles
        this.userName = user.nombre ? `${user.nombre} ${user.apellido || ''}`.trim() : 'Usuario';
        this.userEmail = user.correo || '';
        if (user.imagen) {
          this.userImage = user.imagen;
        }
      }
    });
  }
}
