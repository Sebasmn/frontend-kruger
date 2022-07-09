import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  getAllUsers(): Observable<any> {
    return this.http.get(API_URL + 'getAllUsers', { responseType: 'text' });
  }
  getUserByCard(userCard: string): Observable<any> {
    return this.http.get(API_URL + 'getUserByCard/' + userCard);
  }
  registerNewEmployee(card: string, names:string, lastNames:string, email:string): Observable<any> {
    return this.http.post(API_URL + 'createUser', {
      card,
      names,
      lastNames,
      email
    }, httpOptions);
  }
  updateUserByCard(card: string, names:string, lastNames:string, email:string, bornDate:string, direction:string, phone:string, vaccinated:string, type:string, vaccinatedDate:string, doseNumber:string): Observable<any> {
    return this.http.put(API_URL + 'updateUserByCard/' + card, {names,
      lastNames,
      email,
      bornDate,
      direction,
      phone,
      vaccinated,
      type,
      vaccinatedDate,
      doseNumber
    }, httpOptions);
  }
  deleteUserByCard(card: string): Observable<any> {
    return this.http.delete(API_URL + 'deleteUserByCard/' + card);
  }
}
