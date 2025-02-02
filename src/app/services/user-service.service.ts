import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  id : any ;
  username: string;
  email: string | null;
  number: string | null;
  totalBalance: number | 0;
  rechargeBalance: number | 0;
  referral: number;
  plan : string
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();  // Observable to subscribe to user data

  constructor() {
    this.loadUserData();  // Load user data when service is initialized
  }

  // Method to load user data from localStorage or any other source
  private loadUserData(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.userSubject.next(JSON.parse(userData));  // Set user data to the BehaviorSubject
    }
  }

  // Method to set user data
  setUser(user: User): void {
    this.userSubject.next(user);  // Update BehaviorSubject with new user data
    localStorage.setItem('user', JSON.stringify(user));  // Save user data to localStorage
  }

  clearUser(): boolean {
    try {
      localStorage.clear(); // or localStorage.clear();
      return true; // Indicate success
    } catch (error) {
      console.error("Error clearing user data:", error);
      return false; // Indicate failure
    }
  }
  

  // Method to fetch user data (can be used when verifying or updating user info)
  getUser(): User | null {
    return this.userSubject.value;  // Get the current value of the user data
  }
}
