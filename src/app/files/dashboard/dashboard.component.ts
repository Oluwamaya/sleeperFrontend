import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service.service';  // Adjust the path to your service
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface User {
  id : any ;
  username: string;
  email: string | null;
  number: string | null;
  totalBalance: number | 0;
  rechargeBalance: number | 0;
  referral: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule , RouterModule ,CommonModule , ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userInfo: User | null = null;  // Variable to store the current user
  constructor(private http: HttpClient, private route: Router, private userService: UserService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log('Retrieved Token:', token);

    if (token) {
      this.verifyToken(token);
    } else {
      this.route.navigate(['/login']); // If no token is present, redirect to login
    }
  }

  verifyToken(token: string): void {
    this.http
      .get('http://localhost:3210/verifyToken', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe(
        (res: any) => {
          // console.log(res.user);
         
          this.userService.setUser(res.user);  
          this.userInfo =  res.user
          console.log(this.userInfo);
          
        },
        (error) => {
          console.log(error);
          alert('Token Expired, please log in again');
          this.route.navigate(['/login']);
        }
      );
  }

  // This method will be used to fetch user data from the service
  getUserFromService(): User | null {
    const user = this.userService.getUser();
    console.log(user);

    return user
    
  }
  


  // This can be used for logging out and clearing user data
  logout(): void {
    this.userService.clearUser();
    this.route.navigate(['/login']);
  }
}
