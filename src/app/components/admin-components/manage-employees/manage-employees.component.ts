import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Employee } from 'src/app/_models/employee.model';
import { Rol } from 'src/app/_models/rol.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { EditUserComponent } from '../popups/edit-user/edit-user.component';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { CreateUserComponent } from '../popups/create-user/create-user.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss']
})
export class ManageEmployeesComponent implements OnInit {

  // Datos intervalos de fecha
  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  // Select de vacunas
  selectedState = new FormControl('valid', Validators.required);
  selectedType = new FormControl('valid', Validators.required);
  matcher = new MyErrorStateMatcher();

   // Declaracion de variables
   loadingState: boolean = false;
   // Datos tabla
   columnas: string[] = [
     'card',
     'completeName',
     'email',
     'bornDate',
     'direction',
     'phone',
     'vaccinated',
     'typeVaccine',
     'vaccinatedDate',
     'vaccinatedNumber',
     'edit',
     'delete'
   ];
   employeeData: Employee[] = [];
   dataSource = new MatTableDataSource(this.employeeData);
   isLoggedIn = false;
   currentUser: any;
   private roles: string[] = [];
   isAdmin: boolean = false;
   isEmployee: boolean = false;

  constructor( private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadingState = true;

    // Obtenemos el usuario que inicio sesion
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.currentUser = this.tokenStorageService.getUser();
      this.loadDataSource();
      //this.roles = user.roles;
      //this.username = user.names + " " + user.lastNames;
      this.validateUserData(user.card);
    }
  }

  loadDataSource(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        console.log(data);
        let allUsers = JSON.parse(data);
        for (let i = 0; i < allUsers.length; i++) {
          let userRoles: Rol[] = [];
          //Obtenemos los roles
          for (let j = 0; j < allUsers[i].roles.length; j++) {
            userRoles.push(
              new Rol(allUsers[i].roles[j].id, allUsers[i].roles[j].name)
            );
          }
          let isAdmin = userRoles.find((o) => {
            if (o.name === 'administrador') {
                return true;
            }
            return false;
          });
          if(!isAdmin){
            this.employeeData.push(
              new Employee(
                allUsers[i].card,
                allUsers[i].names,
                allUsers[i].lastNames,
                allUsers[i].email,
                allUsers[i].bornDate,
                allUsers[i].direction,
                allUsers[i].phone,
                allUsers[i].vaccinated,
                allUsers[i].type,
                allUsers[i].vaccinatedDate,
                allUsers[i].doseNumber,
                userRoles
              )
            );
          }
          console.log(allUsers[i]);
        }
      },
      (err) => {
        console.log(JSON.parse(err.error).message);
      }
    );
  }

  validateUserData(card: string): void {
    //Obtenemos la informacion del usuario
    this.userService.getUserByCard(card).subscribe(
      (data) => {
        for (let i = 0; i < data.roles.length; i++) {
          this.roles.push(data.roles[i].name);
        }
        this.validateRoles();
        this.loadingState = false;
      },
      (err) => {
        console.log(err.error.message);
        this.loadingState = false;
      }
    );
  }

  validateRoles(): void {
    this.isAdmin = this.roles.includes('administrador');
    this.isEmployee = this.roles.includes('empleado');
  }

  employeesFilter(info) {
    /*const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();*/

    // if(info.target.value.length > 0){
    //   let information: any = info.target.value;
    //   this.productService.searchProducts(information).subscribe(
    //     (data) => {
    //       this.productData = [];
    //       this.dataSource = new MatTableDataSource(this.productData);
    //       for (let i = 0; i < data.length; i++) {
    //         this.productData.push(
    //           new Product(
    //             data[i].id,
    //             data[i].name,
    //             data[i].description,
    //             data[i].excerpt,
    //             data[i].post_status,
    //             data[i].stock,
    //             data[i].stock_status,
    //             data[i].url_image,
    //             data[i].post_date,
    //             data[i].post_modified
    //           )
    //         );
    //       }
    //       this.dataSource = new MatTableDataSource(this.productData);
    //     },
    //     (err) => {
    //       console.log(JSON.parse(err.error).message);
    //     }
    //   );
    // }else{
    //   this.productService.getAllProducts().subscribe(
    //     (data) => {
    //       this.productData = [];
    //       this.dataSource = new MatTableDataSource(this.productData);
    //       let allProducts = JSON.parse(data);
    //       for (let i = 0; i < allProducts.length; i++) {

    //         this.productData.push(
    //           new Product(
    //             allProducts[i].id,
    //             allProducts[i].name,
    //             allProducts[i].description,
    //             allProducts[i].excerpt,
    //             allProducts[i].post_status,
    //             allProducts[i].stock,
    //             allProducts[i].stock_status,
    //             allProducts[i].url_image,
    //             allProducts[i].post_date,
    //             allProducts[i].post_modified
    //           )
    //         );
    //       }
    //     },
    //     (err) => {
    //       console.log(JSON.parse(err.error).message);
    //       this.loadingState = false;
    //     }
    //   );
    // }

  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      // Se cierra el popup
    });
  }

  editEmployee(card: string): void {
  //Obtenemos la informacion del usuario
  this.userService.getUserByCard(card).subscribe(
    (data) => {
      const dialogRef = this.dialog.open(EditUserComponent, {
        data: {
          card: card,
          names: data.names,
          lastNames: data.lastNames,
          email: data.email,
          bornDate: data.bornDate,
          phone: data.phone,
          vaccinated: data.vaccinated,
          type: data.type,
          vaccinatedDate: data.vaccinatedDate,
          doseNumber: data.doseNumber,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        //se cierra el dialogo
      });
    },
    (err) => {
      this.openErrorMessage(err.error.message);
    }
  );
  }

  openErrorMessage(message: string): void {
    Swal.fire({
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  deleteEmployee(card: string): void {
    Swal.fire({
      title: 'Estas seguro que deseas eliminar el empleado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1E5B8E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, remover',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserByCard(card).subscribe(
          (data) => {
            Swal.fire(
              "Eliminación satisfactoria",
              data.message,
              'success'
            ).then(() => {
              this.router.navigate([]).then((result) => {
                window.open('/adminpanel', '_self');
              });
            });
          },
          (err) => {
            this.openErrorMessage("No se pudo eliminar el empleado");
            console.log(err.error.message);
          }
        );

        Swal.fire({
          icon: 'success',
          title: 'El empleado fue removido satisfactoriamente',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

  }
}
