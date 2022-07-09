import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Employee } from 'src/app/_models/employee.model';
import { User } from 'src/app/_models/user.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {

   // Select de vacunas
   selectedState = new FormControl('valid', Validators.required);
   selectedType = new FormControl('valid', Validators.required);
   matcher = new MyErrorStateMatcher();

    // Declaración de variables
  loadingState: boolean = false;
  isLoggedIn: boolean = false;
  employee: User;
  selectedTypeOption;

  // Declaración de validadores para el formulario de registro
  informationForm: FormGroup = new FormGroup({
    names: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      Validators.pattern('[a-zA-ZñÑ ]{2,100}'),
    ]),
    lastNames: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      Validators.pattern('[a-zA-ZñÑ ]{2,100}'),
    ]),
    card: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('[0-9]{10}'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    bornDate: new FormControl('',
      Validators.required),
      direction: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern('[a-zA-ZñÑ ]{2,100}'),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[0-9]{10}'),
      ]),
      vaccinated: new FormControl('',
      Validators.required)
  });

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    let userCard = user.card;
    this.getUserByCard(userCard);
    this.disableInputs();
    this.informationForm.controls['vaccinated'].setValue(false);
  }

  setInformation(employee: User):void {
    this.informationForm.controls['names'].setValue(employee.names);
    this.informationForm.controls['lastNames'].setValue(employee.lastNames);
    this.informationForm.controls['card'].setValue(employee.card);
    this.informationForm.controls['email'].setValue(employee.email);
    this.informationForm.controls['bornDate'].setValue(employee.bornDate);
    this.informationForm.controls['direction'].setValue(employee.direction);
    this.informationForm.controls['phone'].setValue(employee.phone);
    this.informationForm.controls['vaccinated'].setValue(employee.vaccinated);
    // this.selectedTypeOption = employee.typeVaccine;
  }

  disableInputs(): void {
    this.informationForm.controls['names'].disable();
    this.informationForm.controls['lastNames'].disable();
    this.informationForm.controls['card'].disable();
    this.informationForm.controls['email'].disable();
  }

  updateInformation(): void {
    if(this.informationForm.valid){
      let cardU = this.informationForm.controls['card'].value;
      let namesU = this.informationForm.controls['names'].value;
      let lastNamesU = this.informationForm.controls['lastNames'].value;
      let emailU = this.informationForm.controls['email'].value;
      let bornDU = this.informationForm.controls['bornDate'].value;
      let directionU = this.informationForm.controls['direction'].value;
      let phoneU = this.informationForm.controls['phone'].value;
      let vaccinatedU = this.informationForm.controls['vaccinated'].value;
      let typeVU = this.selectedTypeOption;
      // Abrimos nuestro componente de carga
      this.loadingState = true;
      //Actualizamos la informacion del usuario
      this.userService.updateUserByCard(cardU, namesU, lastNamesU, emailU, bornDU, directionU, phoneU, vaccinatedU, typeVU, "", "").subscribe(
        data => {
          this.openSuccessUpdate();
        },
        err => {
          this.openUpdateError(err.error.message);
          this.loadingState = false;
        }
      );
  }else{
    this.openUpdateError("Debes ingresar todos los datos");
    this.loadingState = false;
    }
  }

   openSuccessUpdate(): void {
    this.loadingState = false;
    Swal.fire({
      icon: 'success',
      title: 'Empleado creado correctamente',
      showConfirmButton: false,
      timer: 2000
    }).then(()=>{
      this.router.navigate([]).then(result => {  window.open('/employeepanel', '_self'); });
    });

  }

  openUpdateError(mensaje: string) : void {
    Swal.fire({
      icon: 'error',
      title: 'No se pudo actualizar el usuario',
      text: mensaje,
      confirmButtonColor: "#6522D9",
       confirmButtonText: "Aceptar",
    });
  }


    getUserByCard(card: string){
    this.loadingState = true;
    //Obtenemos la informacion del usuario
    this.userService.getUserByCard(card).subscribe(
      data => {
        this.employee = new User(data.card, data.names, data.lastNames, data.email, data.bornDate, data.direction, data.phone,
          data.vaccinated, data.typeVaccine, data.vaccinatedDate, data.vaccinatedNumber);
          console.log(this.employee);
        this.setInformation(this.employee);
        this.loadingState = false;
      },
      err => {
        this.loadingState = false;
      }
    );
  }

}
