import { Component, inject, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  router = inject(Router);

  username = input<string>('');

  get firstName(): string {
    const fullName = this.username();
    return fullName ? fullName.split(' ')[0] : '';
  }

  onLogout() {
    sessionStorage.removeItem('userName');
    this.router.navigate(['/']);
  }
}
