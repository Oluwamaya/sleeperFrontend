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

ngOnInit(){

  this.userService.user$.subscribe((user) => {
    this.user = user;
    console.log(this.user);  // Now you have access to the user data
  });
}

logout(): void {
  const isLoggedOut = this.userService.clearUser();
  
  if (!isLoggedOut) {
    alert("An error occurred while logging you out. Please try again.");
    return;
  }

  alert("You have been successfully logged out. We look forward to seeing you again soon!");
  this.route.navigate(['/login']);
}

}
