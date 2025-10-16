import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AUTH_ROUTES } from './auth.routes';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Add ReactiveFormsModule
    RouterModule.forChild(AUTH_ROUTES)
  ]
})
export class AuthModule { }
