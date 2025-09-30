import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, OnInit, inject } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '@app/modules/auth/store/selectors/auth.selector';
import { Usuario } from '@app/modules/auth/interfaces/usuario.interface';
import { Observable } from 'rxjs';
import { TokenService } from '@app/modules/auth/services/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenuComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @HostBinding('class') hostClass =
    'fixed top-0 z-10 left-0 right-0 flex flex-col items-stretch shrink-0 bg-[#fefefe] dark:bg-coal-500 shadow-sm dark:border-b dark:border-b-coal-100';
  @HostBinding('attr.role') hostRole = 'banner';
  @HostBinding('attr.data-sticky') dataSticky = 'true';
  @HostBinding('attr.data-sticky-name') dataStickyName = 'header';
  @HostBinding('id') hostId = 'header';

  private store = inject(Store);
  private tokenService = inject(TokenService);

  // Usuario actual
  currentUser$: Observable<Usuario | null>;
  userName: string = 'Hola!';
  userEmail: string = '';
  userImage: string =
    'https://semanticadesarrollo.tor1.digitaloceanspaces.com/itrio/usuario_defecto.jpg';

  // Estado de autenticación
  isAuthenticated: boolean = false;

  public menuItems: any[] = [
    // {
    //   titulo: 'Perfil',
    //   icono: 'ki-filled ki-user',
    //   link: '/perfil',
    // },
  ];
  ngOnInit(): void {
    // Verificar si el usuario está autenticado
    this.isAuthenticated = this.tokenService.validarToken();

    // Obtener el usuario actual del store
    this.currentUser$ = this.store.select(selectCurrentUser);

    // Suscribirse para actualizar los datos del usuario
    this.currentUser$.subscribe(user => {
      if (user) {
        // Usar nombre y apellido si están disponibles
        this.userName = user.nombre ? `${user.nombre} ${user.apellido || ''}`.trim() : 'Usuario';
        this.userEmail = user.correo || '';
        if (user.imagen_thumbnail) {
          this.userImage = user.imagen_thumbnail;
        }

        // Actualizar el estado de autenticación
        this.isAuthenticated = true;
      } else {
        // Verificar nuevamente con el token
        this.isAuthenticated = this.tokenService.validarToken();
      }
    });
  }
}
