import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { NavbarAuthModule } from '../../shared/navbar-auth/navbar-auth.module';
import { FooterModule } from '../../shared/footer/footer.module';
import { AuthPageRoutes } from './auth-page.routing';
import { SigninComponent } from './signin/signin.component';
import { ComponentModule } from '../../components';
import { RolePageComponent } from './role-page/role-page.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(AuthPageRoutes),
    FormsModule,
    ReactiveFormsModule,
    NavbarAuthModule,
    FooterModule,
    ComponentModule
  ],
  declarations: [
    SigninComponent,
    RolePageComponent
  ],
  entryComponents: [

  ]
})

export class AuthPageModule {}
