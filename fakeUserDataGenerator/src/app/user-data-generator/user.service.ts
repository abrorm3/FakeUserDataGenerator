import { Injectable } from '@angular/core';
import {faker, fakerRU, fakerKA_GE, fakerJA} from "@faker-js/faker";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  generateUserData(lang: string) {
    const langModule = lang === 'RU' ? fakerRU : lang === 'KA_GE' ? fakerKA_GE : lang === 'JA' ? fakerJA: faker;

    const userData: any[] = [];

    for (let i = 0; i < 30; i++) {
      const user = {
        id: i + 1,
        name: langModule.person.fullName(),
        address: langModule.location.streetAddress(),
        phone: langModule.phone.number(),
      };

      userData.push(user);
    }

    return userData;
  }
}
