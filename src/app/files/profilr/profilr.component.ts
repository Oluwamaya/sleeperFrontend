import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profilr',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profilr.component.html',
  styleUrl: './profilr.component.css'
})
export class ProfilrComponent {
  public user : any = {}
constructor(private userService : UserService ){}

ngOnInit(){

  this.userService.user$.subscribe((user) => {
    this.user = user;
    console.log(this.user);  // Now you have access to the user data
  });
}
}
