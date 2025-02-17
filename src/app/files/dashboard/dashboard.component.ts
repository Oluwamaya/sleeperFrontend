import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service.service';  // Adjust the path to your service
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";

interface User {
  id : any ;
  username: string;
  email: string | null;
  number: string | null;
  totalBalance: number | 0;
  rechargeBalance: number | 0;
  referral: number;
  walletAddress : string | null
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userInfo: User | null = null;  // Variable to store the current user
  constructor(private http: HttpClient, private route: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.verifyToken(); // Verify token when component loads

    this.userService.user$.subscribe((user) => {
      this.userInfo = user;
      console.log(this.userInfo);
    });
  }

}