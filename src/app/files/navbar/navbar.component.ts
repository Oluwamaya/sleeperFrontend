import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isCustomerServiceVisible = false;

  toggleCustomerService() {
    this.isCustomerServiceVisible = !this.isCustomerServiceVisible;
  }

  // Detect click outside the Customer Service panel
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const customerServicePanel = document.getElementById('customerServicePanel');

    // Close if clicking outside the customer service panel
    if (this.isCustomerServiceVisible && customerServicePanel && !customerServicePanel.contains(event.target as Node)) {
      this.isCustomerServiceVisible = false;
    }
  }
}
