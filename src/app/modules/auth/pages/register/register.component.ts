import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepository } from '../../repositories/auth.repository';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';
import { matchFieldsValidator } from '@app/common/validators/match-field.validator';
import { InputComponent, ButtonComponent } from '@tamerlantian/ui-components';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private authService = inject(AuthRepository);

  public registrando = signal<boolean>(false);
  public formularioRegister = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmarContrasena: new FormControl('', [Validators.required]),
      terminoCondicion: new FormControl(false, [Validators.required]),
    },
    {
      validators: [matchFieldsValidator('password', 'confirmarContrasena')],
    }
  );

  register() {
    this.registrando.set(true);
    this.authService
      .register({
        username: this.formularioRegister.get('username')?.value,
        password: this.formularioRegister.get('password')?.value,
        confirmarContrasena: this.formularioRegister.get('confirmarContrasena')?.value,
        terminoCondicion: this.formularioRegister.get('terminoCondicion')?.value,
        proyecto: 'REDDOC',
      })
      .pipe(finalize(() => this.registrando.set(false)))
      .subscribe(res => {
        console.log(res);
      });
  }
}
