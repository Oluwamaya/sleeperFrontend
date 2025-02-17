import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})
export class PlanComponent {
  public user : any ={}
constructor(private userService : UserService ){}

 ngOnInit(): void {
    this.userService.verifyToken(); // Verify token when component loads

    this.userService.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }
}
