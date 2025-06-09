import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  router = inject(Router);

  username = input<string>('');
  activeTab = input<'clientes' | 'selecionados'>('clientes');

  onLogout() {
    sessionStorage.removeItem('userName');
    this.router.navigate(['/']);
  }
}
