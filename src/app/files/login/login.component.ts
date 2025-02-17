import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { HttpClient, HttpClientModule   } from '@angular/common/http';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, RouterModule,RouterLink, ReactiveFormsModule, HttpClientModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isEmailLogin = true; // Toggles between Email and Phone Login
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient , private route : Router , private userService : UserService) {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.email]], // Initially no Validators.required
        number: ['', [Validators.maxLength(12)]], // Initially no Validators.required
        password: ['', Validators.required],
      },
      { validators: this.validateInputType.bind(this) } // Bind the custom validator
    );
  }

  // Getter to access form controls easily in template
  get f() {
    return this.loginForm.controls;
  }

  toggleInput(type: 'email' | 'number') {
    this.isEmailLogin = type === 'email';
    this.loginForm.updateValueAndValidity(); // Trigger validation update
  }

  onReferralCodeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Allow only numbers by stripping out anything that's not a number
    input.value = input.value.replace(/\D/g, '');
  }

  submit() {
    if (this.loginForm.valid) {
      const value = this.loginForm.value;
      console.log(value);
      if (value.email !== '' && value.number !== '') {
        console.log(value.email, value.number);

        alert(
          'Login requires either an email or a Phone number, but not both.'
        );
        return;
      }

      this.http.post<any>('http://localhost:3210/login  ', value).subscribe(
        (res) => {
          console.log(res);
          alert(res.message);

          const saveUser = this.userService.setToken(res.token) 
          this.route.navigate(["/dashboard"])
        },
        (error) => {
          console.log(error);
          alert(error.error);
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  // Custom Validator: Ensure only the active input type (email or number) is required
  validateInputType(control: AbstractControl) {
    const email = control.get('email')?.value;
    const number = control.get('number')?.value;

    if (this.isEmailLogin && !email) {
      return { emailRequired: true };
    }
    if (!this.isEmailLogin && !number) {
      return { phoneRequired: true };
    }
    return null; // No validation errors
  }
}
