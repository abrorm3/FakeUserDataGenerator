import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Import `of` to create an observable
import { generateUserData } from './data-generator'; // Import the generator function

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  generateUserData(seed: number, lang: string, count: number): Observable<any[]> {
    const userData = generateUserData(seed, lang, count);
    return of(userData);
  }
}

