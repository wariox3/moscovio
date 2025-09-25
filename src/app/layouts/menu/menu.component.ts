import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { logout } from '@app/modules/auth/store/actions/login.action';
import { TokenService } from '@app/modules/auth/services/token.service';
import { Store } from '@ngrx/store';
import { ProfileImageService } from '@app/core/services/profile-image.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  @Input({ required: true }) titulo: string;
  @Input() subtitulo: string;
  @Input({ required: true }) menuItems: any[];
  @Input() imagen: string;

  private store = inject(Store);
  private router = inject(Router);
  private tokenService = inject(TokenService);
  private profileImageService = inject(ProfileImageService);

  // Use the service's profileImageUrl signal
  protected profileImageUrl = this.profileImageService.profileImageUrl;
  protected isAuthenticated = signal<boolean>(false);

  ngOnInit(): void {
    // Verificar autenticación al iniciar el componente
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    this.isAuthenticated.set(this.tokenService.validarToken());
  }

  cerrarSesion() {
    this.store.dispatch(logout());
    // Redirigir al login después de cerrar sesión
    this.router.navigate(['/auth/login']);
  }

  iniciarSesion() {
    this.router.navigate(['/auth/login']);
  }
}
