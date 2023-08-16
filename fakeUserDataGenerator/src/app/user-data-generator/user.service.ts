import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faker, fakerRU, fakerKA_GE, fakerJA } from '@faker-js/faker';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  generateUserData(seed: number, lang: string):Observable<any[]> {
    const url = `${this.baseUrl}/generateUserData?seed=${seed}&lang=${lang}`;
    return this.http.get<any[]>(url);
  }
}
