import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() public sideNav = new EventEmitter();

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminPanel = false;
  showEmployeePanel = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      //this.roles = user.roles;
      //this.username = user.names + " " + user.lastNames;
      this.validateUserData(user.card);
    }
  }

  validateUserData(card: string): void {
    //Obtenemos la informacion del usuario
    this.userService.getUserByCard(card).subscribe(
     data => {
       for(let i=0; i<data.roles.length; i++){
         this.roles.push(data.roles[i].name);
       }
       this.validateRoles();
       this.username = data.names + " " + data.lastNames;
     },
     err => {
       console.log(err.error.message);
     }
   );
 }

 validateRoles(): void {
  this.showAdminPanel = this.roles.includes('administrador');
  this.showEmployeePanel = this.roles.includes('empleado');
  }

  showSidenav(): void {
    this.sideNav.emit();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate([]).then(result => {  window.open('/login', '_self'); });
  }
}
