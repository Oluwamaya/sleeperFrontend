import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  isEmailLogin = true;
  signupForm: FormGroup;
  showPassword = false;
  showCPassword = false;
  referralCode: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        username: [
          '',
          [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])/)],
        ],
        email: ['', [Validators.email]],
        number: ['', [Validators.maxLength(12)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
          ],
        ],
        Cpassword: ['', [Validators.required]],
        referral: ['', [Validators.pattern(/^\d{6}$/)]],
      },
      {
        validators: [
          this.passwordMatchValidator,

          this.validateInputType.bind(this),
        ],
      }
    );
  }

  ngOnInit() {
    this.getReferral();
  }
  getReferral() {
    this.route.paramMap.subscribe((params) => {
      this.referralCode = params.get('referralCode') || '';
      console.log('Referral Code:', this.referralCode);
      this.signupForm.patchValue({ referral: this.referralCode });
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onReferralCodeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Allow only numbers by stripping out anything that's not a number
    input.value = input.value.replace(/\D/g, '');
  }

  toggleInput(type: 'email' | 'number') {
    this.isEmailLogin = type === 'email';
    this.signupForm.updateValueAndValidity();
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'Cpassword') {
      this.showCPassword = !this.showCPassword;
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('Cpassword')?.value;
    return password === confirmPassword ? null : { match: true };
  }

  // Custom Validator: Ensure only the active input type (email or number) is required
  validateInputType(control: AbstractControl): ValidationErrors | null {
    const email = control.get('email')?.value;
    const number = control.get('number')?.value;

    if (this.isEmailLogin && !email) {
      return { emailRequired: true };
    }

    if (!this.isEmailLogin && !number) {
      return { numberRequired: true };
    }

    return null; // No validation errors
  }

  submit() {
    if (this.signupForm.valid) {
      console.log('Form Data:', this.signupForm.value);
      const value = this.signupForm.value;
      if (value.email !== '' && value.number !== '') {
        console.log(value.email, value.number);

        alert(
          'Please Sign Up using either your email or phone number, not both'
        );
        return;
      }

      this.http.post<any>('http://localhost:3210/register', value).subscribe(
        (res) => {
          console.log(res);
          alert(res.message);
          if (res.status === true) {
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          console.log(error);
          alert(error.error);
        }
      );
    } else {
      this.signupForm.markAllAsTouched();
      console.log('Form is invalid');
      alert('All Fields are required');
    }
  }
}
