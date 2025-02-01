import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})
export class PlanComponent {
  public user : any ={}
constructor(private userService : UserService ){}

ngOnInit(){

  this.userService.user$.subscribe((user) => {
    this.user = user;
    console.log(this.user);  // Now you have access to the user data
  });
}
}
