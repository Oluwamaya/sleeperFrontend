import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError } from 'rxjs';
import { Router } from '@angular/router';

interface User {
  id: any;
  username: string;
  email: string | null;
  number: string | null;
  totalBalance: number;
  rechargeBalance: number;
  referral: number;
  plan: string;
  walletAddress: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private userToken = new BehaviorSubject<string | null>(null);

  public user$ = this.userSubject.asObservable();
  public token$ = this.userToken.asObservable();

  private apiUrl = 'http://localhost:3210/verifyToken'; 

  constructor(private http: HttpClient, private router: Router) {}

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  setToken(token: string): void {
    this.userToken.next(token);
    sessionStorage.setItem('userToken', token);
  }

  getToken(): string | null {
    return this.userToken.value || sessionStorage.getItem('userToken');
  }

  verifyToken(): void {
    const token = this.getToken();
    if (!token) {
      this.handleInvalidToken();
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<{ user: User }>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Token verification failed:', error);
        this.handleInvalidToken();
        throw error;
      })
    ).subscribe((res) => {
      if (res.user) {
        this.setUser(res.user);
      }
    });
  }

  handleInvalidToken(): void {
    alert('Token not found or expired, login again to continue');
    this.router.navigate(['/login']);
  }

  clearUser(): void {
    this.userSubject.next(null);
    this.userToken.next(null);
    sessionStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
