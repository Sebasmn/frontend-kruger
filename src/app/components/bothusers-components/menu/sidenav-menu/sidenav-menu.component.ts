import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit {

  @Output() sidenavClick = new EventEmitter();

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

  onSidenavClick(): void {
    this.sidenavClick.emit();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate([]).then(result => {  window.open('/login', '_self'); });
  }

}
