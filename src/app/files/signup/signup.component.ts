import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule , RouterModule , HttpClientModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  isEmailLogin = true;
  signupForm: FormGroup;
  showPassword = false; 
  showCPassword = false; 

  constructor(private fb: FormBuilder , private route: ActivatedRoute , private http: HttpClient) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.email]],
      phone: ['', [Validators.maxLength(12)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
        ],
      ],
      Cpassword: ['', [Validators.required]],
      refferal: ['',   [Validators.pattern(/^\d{6}$/)]],
    },
    {
      validators: [this.passwordMatchValidator,
    
      this.validateInputType.bind(this) ]
    }
  );
  }

  ngOnInit() {
    // Get the referral code from the URL
    this.route.queryParams.subscribe(params => {
      const referralCode = params['ic'];
      if (referralCode) {
        // Set the referral code into the form control
        this.signupForm.patchValue({ refferal: referralCode });
      }
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

  toggleInput(type: 'email' | 'phone') {
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


  // Custom Validator: Ensure only the active input type (email or phone) is required
  validateInputType(control: AbstractControl): ValidationErrors | null {
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
  
  submit() {
    if (this.signupForm.valid) {
      console.log('Form Data:', this.signupForm.value);
      const value = this.signupForm.value

      this.http.post<any>("", value).subscribe((res)=>{
        console.log(res);
        
      },(error)=>{
        console.log(error);
        
      })
    } else {
      this.signupForm.markAllAsTouched();
      console.log('Form is invalid');
      alert("All Fields are required")
    }
  } 
}


