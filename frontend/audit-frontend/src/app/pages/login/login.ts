import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  submitted = signal(false);
  loginForm!: FormGroup;
  loading = signal(false);
  errorMessage = signal('');

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // 用户一输入，就自动清除该字段错误
    this.loginForm.valueChanges.subscribe(() => {
      if (this.submitted()) {
        // 重新触发模板计算
        this.submitted.set(true);
      }
    });
  }

  onSubmit() {
    this.submitted.set(true);

    if (this.loginForm.invalid || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const { username, password } = this.loginForm.value;

    console.log('submit:', username, password);

    // backendが完成するまで一旦mock
    // setTimeout(() => {
    //   if (username === 'admin' && password === '123456') {
    //     localStorage.setItem('token', 'fake-token');
    //     console.log('login success');
    //     this.onLoginSuccess();
    //   } else {
    //     this.errorMessage.set('ユーザーIDまたはパスワードが間違っています。');
    //   }
    //   this.loading.set(false);
    // }, 1000)

    this.authService.login(username, password).subscribe({
      next: (res) => {
        console.log(res.user.username);
        console.log(res.message);
        this.onLoginSuccess();
      },
      error: (err) => {
        this.errorMessage.set(err.error.message);
        this.loading.set(false);
      }
    });
  }

  // 必須項目error表示
  showRequired(controlName: 'username' | 'password'): boolean {
    const control = this.loginForm.get(controlName);
    return (
      this.submitted() &&
      !!control &&
      control.hasError('required')
    );
  }

  // ログイン成功
  onLoginSuccess() {
    this.router.navigate(['/login-success']);
  }
}
