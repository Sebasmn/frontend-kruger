import { Rol } from "./rol.model";

export class Employee {
  card: string = '';
  names: string = '';
  lastNames: string = '';
  email: string = '';
  bornDate: string = '';
  direction: string = '';
  phone: string = '';
  vaccinated: boolean = false;
  typeVaccine: string = '';
  vaccinatedDate: string = '';
  vaccinatedNumber: string = '';
  roles: Rol[];

  constructor(card: string, names: string, lastNames: string, email: string, bornDate: string, direction: string, phone: string, vaccinated: boolean,
    typeVaccine: string, vaccinatedDate: string, vaccinatedNumber: string, roles: Rol[]){
    this.card = card;
    this.names = names;
    this.lastNames = lastNames;
    this.email = email;
    this.bornDate = bornDate;
    this.direction = direction;
    this.phone = phone;
    this.vaccinated = vaccinated;
    this.typeVaccine = typeVaccine;
    this.vaccinatedDate = vaccinatedDate;
    this.vaccinatedNumber = vaccinatedNumber;
    this.roles = roles;
  }
}

