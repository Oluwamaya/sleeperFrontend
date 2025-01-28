import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, RouterModule, ReactiveFormsModule ],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isEmailLogin = true; // Toggles between Email and Phone Login
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.email]], // Initially no Validators.required
        phone: ['', [Validators.maxLength(12)]], // Initially no Validators.required
        password: ['', Validators.required],
      },
      { validators: this.validateInputType.bind(this) } // Bind the custom validator
    );
  }

  // Getter to access form controls easily in template
  get f() {
    return this.loginForm.controls;
  }

  toggleInput(type: 'email' | 'phone') {
    this.isEmailLogin = type === 'email';
    this.loginForm.updateValueAndValidity(); // Trigger validation update
  }

  submit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log(formData);
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  // Custom Validator: Ensure only the active input type (email or phone) is required
  validateInputType(control: AbstractControl) {
    const email = control.get('email')?.value;
    const phone = control.get('phone')?.value;

    if (this.isEmailLogin && !email) {
      return { emailRequired: true };
    }
    if (!this.isEmailLogin && !phone) {
      return { phoneRequired: true };
    }
    return null; // No validation errors
  }
}
