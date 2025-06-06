import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
  });

  onLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      sessionStorage.setItem('userName', username || '');
      this.router.navigate(['/clientes']);
    }
  }
}
