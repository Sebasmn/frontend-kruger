import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageEmployeesComponent } from './components/admin-components/manage-employees/manage-employees.component';
import { MenuComponent } from './components/bothusers-components/menu/menu.component';
import { PersonalInformationComponent } from './components/employee-components/personal-information/personal-information.component';
import { LoadingComponent } from './components/bothusers-components/loading/loading.component';
import { LoginComponent } from './components/bothusers-components/login/login.component';
import { SidenavMenuComponent } from './components/bothusers-components/menu/sidenav-menu/sidenav-menu.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './angular-material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BackMenuComponent } from './components/bothusers-components/menu/sidenav-menu/back-menu/back-menu.component';
import { FooterComponent } from './components/bothusers-components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { EditUserComponent } from './components/admin-components/popups/edit-user/edit-user.component';
import { CreateUserComponent } from './components/admin-components/popups/create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageEmployeesComponent,
    MenuComponent,
    PersonalInformationComponent,
    LoadingComponent,
    LoginComponent,
    SidenavMenuComponent,
    BackMenuComponent,
    FooterComponent,
    EditUserComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
