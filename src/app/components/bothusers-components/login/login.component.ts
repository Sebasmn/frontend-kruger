import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Declaración de variables
  roles: string[] = [];
  isLoggedIn = false;
  loadingState: boolean = false;
  hide = true;

  // Declaración de validadores para el formulario de registro
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getUser().roles;
      this.isLoggedIn = true;
    }
  }

  logIn(): void {
    if(this.loginForm.valid){
      // Abrimos nuestra pestaña de carga
      this.loadingState = true;

      // Obtenemos los datos de nuestro formulario
      let username: string = this.loginForm.controls['username'].value;
      let password: string = this.loginForm.controls['password'].value;

      // Consumimos el metodo de nuestro servicio
      this.authService.login(username, password).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.roles = this.tokenStorage.getUser().roles;
          this.isLoggedIn = true;
          this.loadingState = false;
          let haveAdminRole = data.roles.includes('administrador');
          let haveEmployeeRole = data.roles.includes('empleado');
          if(haveAdminRole){
            this.router.navigate([]).then(result => {  window.open('/adminpanel', '_self'); });
          }else if(haveEmployeeRole){
            this.router.navigate([]).then(result => {  window.open('/employeepanel', '_self'); });
          }
        },
        err => {
          this.openLoginError(err.error.message);
        }
      );
    }else{
      this.openLoginError("Debes ingresar todos los datos");
    }
  }

  openLoginError(mensaje: string) : void {
    Swal.fire({
      icon: 'error',
      title: 'No se pudo iniciar sesión',
      text: mensaje,
      confirmButtonColor: "#6522D9",
       confirmButtonText: "Aceptar",
    });
    this.loadingState = false;
  }

  reloadPage(): void {
    window.location.reload();
  }

}
