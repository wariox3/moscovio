import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepository } from '../../repositories/auth.repository';
import { finalize } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { matchFieldsValidator } from '@app/common/validators/match-field.validator';
import { emptyStringToNullValidator } from '@app/common/validators/empty-string-to-null.validator';
import { InputComponent, ButtonComponent, LabelComponent } from '@tamerlantian/ui-components';
import { AlertaService } from '@app/common/services/alerta.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    RouterLink,
    LabelComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private authService = inject(AuthRepository);
  private router = inject(Router);
  private alertaService = inject(AlertaService);

  public registrando = signal<boolean>(false);
  public formularioRegister = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmarContrasena: new FormControl('', [Validators.required]),
      empresa_nombre: new FormControl(null, [emptyStringToNullValidator()]),
      empresa_numero_identificacion: new FormControl(null, [
        emptyStringToNullValidator(),
        Validators.maxLength(20),
      ]),
      terminoCondicion: new FormControl(false, [Validators.requiredTrue]),
    },
    {
      validators: [matchFieldsValidator('password', 'confirmarContrasena')],
    }
  );

  register() {
    this.registrando.set(true);
    const form = this.formularioRegister;
    this.authService
      .register({
        username: form.get('username')?.value,
        password: form.get('password')?.value,
        confirmarContrasena: form.get('confirmarContrasena')?.value,
        empresa_nombre: form.get('empresa_nombre')?.value,
        empresa_numero_identificacion: form.get('empresa_numero_identificacion')?.value,
        terminoCondicion: form.get('terminoCondicion')?.value,
        proyecto: 'REDDOC',
      })
      .pipe(finalize(() => this.registrando.set(false)))
      .subscribe(() => {
        this.router.navigate(['/auth/login']);
        this.alertaService.mostrarExito('Registro exitoso', 'Ahora puedes iniciar sesión');
      });
  }
}
