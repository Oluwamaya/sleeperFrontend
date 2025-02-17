import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-profilr',
  standalone: true,
  imports: [RouterModule, CommonModule, NavbarComponent],
  templateUrl: './profilr.component.html',
  styleUrl: './profilr.component.css'
})
export class ProfilrComponent {
  public user : any = {}
constructor(private userService : UserService , private route : Router){}

ngOnInit(): void {
  this.userService.verifyToken(); // Verify token when component loads

  this.userService.user$.subscribe((user) => {
    this.user = user;
    console.log(this.user);
  });
}

logout(): void {
  const isLoggedOut = this.userService.clearUser();

  alert("You have been successfully logged out. We look forward to seeing you again soon!");
  this.route.navigate(['/login']);
}

}
