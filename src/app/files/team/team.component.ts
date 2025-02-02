import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  public user : any ={}
constructor(private userService : UserService ){}

ngOnInit(){

  this.userService.user$.subscribe((user) => {
    this.user = user;
    console.log(this.user);  // Now you have access to the user data
  });
}
copyToClipboard(value: string, message: string) {
  navigator.clipboard.writeText(value).then(() => {
    alert(message);
  }).catch(err => {
    console.error("Failed to copy: ", err);
  });
}

}
