import { Component } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import QRCode from 'qrcode';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [RouterModule , CommonModule],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {
  public user : any = {}
  qrCodeUrl: string | null = null;
  constructor(private userService : UserService , private route  : Router , private http : HttpClient){}
  ngOnInit(): void {
    this.userService.verifyToken(); // Verify token when component loads

    this.userService.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.generateQRCode()
    });

  }

  generateQRCode(): void {
    QRCode.toDataURL(this.user?.walletAddress)  // Generate the QR code as a Data URL
      .then(url => {
        console.log(url);
        
        this.qrCodeUrl = url;  // Store the URL for displaying the QR code
      })
      .catch(err => {
        console.error('Error generating QR code:', err);
      });
  }
  copyToClipboard(value: string, message: string) {
    navigator.clipboard.writeText(value).then(() => {
      alert(message);
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  }

  comfirmDeposit(walletAddress : string){
console.log(walletAddress);
const value = {
  walletAddress,
  id : this.user?.id
}
 this.http.post<any>("http://localhost:3210/comfirmDeposit", value).subscribe((res)=>{
  console.log(res);
  
 },(error)=>{
  console.log(error);
  
 })

}
}
