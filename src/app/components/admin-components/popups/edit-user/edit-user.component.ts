import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  // Declaración de variables
  loadingState: boolean = false;

  // Declaración de validadores para el formulario de registro
  employeeForm: FormGroup = new FormGroup({
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
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.parametersSelectedEmployee();
    this.employeeForm.controls['card'].disable();
  }

  parametersSelectedEmployee(): void {
    // Seteamos los valores obtenidos de la tabla en nuestro formulario
    this.employeeForm.setValue({
      card: this.data.card,
      names: this.data.names,
      lastNames: this.data.lastNames,
      email: this.data.email,
    });
  }

  updateUser(): void {
    let cardU = this.employeeForm.controls['card'].value;
    let namesU = this.employeeForm.controls['names'].value;
    let lastNamesU = this.employeeForm.controls['lastNames'].value;
    let emailU = this.employeeForm.controls['email'].value;

    if(this.employeeForm.valid){
        // Abrimos nuestro componente de carga
        this.loadingState = true;
        //Actualizamos la informacion del usuario
        this.userService.updateUserByCard(cardU, namesU, lastNamesU, emailU, "", "", "", "", "", "", "").subscribe(
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

  validateUserCard(cedula: string) : boolean {
    let cedulaIngresada: string = cedula;
    let validatedCard: boolean = false;
    let splitCedula: number[] = cedulaIngresada.split('').map(Number);

    if(splitCedula.length == 10) {
      // La cédula tiene 10 dígitos
      // Se valida que los dos primeros dígitos no sean mayores a 24 ni menores a 0
      let firstSecondDigits: number = Number(splitCedula[0].toString() + splitCedula[1].toString());
      let thirdDigit: number = splitCedula[2];
      let lastDigit: number = splitCedula[9];
      if(firstSecondDigits < 24 || firstSecondDigits > 0 || firstSecondDigits == 30){
        if(thirdDigit >= 0 && thirdDigit <= 5){
          let pairNumbers: number[] = [];
          let oddNumbers: number[] = [];
          for(let i=0; i < splitCedula.length - 1; i++){
            if(i % 2 != 0){
              // Esta en una posición par
              pairNumbers.push(splitCedula[i]);
            }else{
              // Esta en una posición impar
              oddNumbers.push(splitCedula[i]);
            }
          }

          let newOddNumbers: number[] = [];
          // Se multiplican por 2 a los números con posición impar
          for(let i=0; i< oddNumbers.length; i++){
            let auxNumber = oddNumbers[i] * 2;
            newOddNumbers.push(auxNumber);
          }
          // Comprobamos que los resultados no sean mayores a 9
          for(let i=0; i< newOddNumbers.length; i++){
            if(newOddNumbers[i] > 9){
              // Si es mayor a 9 se le resta 9
              let auxNumber: number = newOddNumbers[i] - 9;
              // Se asigna el nuevo valor en reemplazo del numero mayor a 9
              newOddNumbers[i] = auxNumber;
            }
          }
          // Sumamos los digitos obtenidos en posiciones pares e impares
          let sumPairNumbers: number = 0;
          let sumOddNumbers: number = 0;
          let totalSum: number = 0;
          let reducer = (accumulator, curr) => accumulator + curr;

          sumPairNumbers = pairNumbers.reduce(reducer);
          sumOddNumbers = newOddNumbers.reduce(reducer);
          totalSum = sumPairNumbers + sumOddNumbers;

          // Tomamos el digito de la derecha de la sumatoria
          let twoDigits: string[] = totalSum.toString().split('');
          let rightDigit: number = Number(twoDigits[1]);

          if(rightDigit == 0){
            if(lastDigit == rightDigit){
              validatedCard = true;
            }
          }else{
            // Si el resultado no es cero se resta de 10 el resultado del numero derecho
            let staticValue: number = 10;
            let substract: number = 0;

            substract = staticValue - rightDigit;
            if(substract == lastDigit){
              validatedCard = true;
            }
          }
        }
      }
    }
    return validatedCard;
  }

  openSuccessUpdate(): void {
    this.dialogRef.close();
    this.loadingState = false;
    Swal.fire({
      icon: 'success',
      title: 'Empleado creado correctamente',
      showConfirmButton: false,
      timer: 2000
    }).then(()=>{
      this.router.navigate([]).then(result => {  window.open('/adminpanel', '_self'); });
    });

  }


  openUpdateError(mensaje: string) : void {
    Swal.fire({
      icon: 'error',
      title: 'No se pudo crear el usuario',
      text: mensaje,
      confirmButtonColor: "#6522D9",
       confirmButtonText: "Aceptar",
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  numberOnly(event): boolean {
    //Método para controlar el ingreso de solo números en nuestra interfaz
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  stringOnly(event): boolean {
    //Método para controlar el ingreso de solo números en nuestra interfaz
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode < 97 || charCode > 122) &&
      (charCode < 65 || charCode > 90) &&
      charCode != 45 &&
      charCode != 241 &&
      charCode != 209 &&
      charCode != 32 &&
      charCode != 225 &&
      charCode != 233 &&
      charCode != 237 &&
      charCode != 243 &&
      charCode != 250 &&
      charCode != 193 &&
      charCode != 201 &&
      charCode != 205 &&
      charCode != 211 &&
      charCode != 218
    ) {
      return false;
    }
    return true;
  }
}
