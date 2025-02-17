import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private userBalance = new BehaviorSubject<number>(0);
  balance$ = this.userBalance.asObservable();


  constructor(private http : HttpClient ) { }

  
}
