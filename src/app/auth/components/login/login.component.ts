import { AsyncPipe, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { BehaviorSubject, finalize } from 'rxjs';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading$ = new BehaviorSubject<boolean>(false);
  destroyRef = inject(DestroyRef);

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.isLoading$.next(true);

    const { username, password } = form.value;
    this.authService
      .login(username, password)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading$.next(false))
      )
      .subscribe();
  }
}
