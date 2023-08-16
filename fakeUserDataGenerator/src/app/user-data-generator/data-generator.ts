import { faker, fakerRU, fakerKA_GE, fakerJA } from '@faker-js/faker';

interface User {
  id: number;
  name: string;
  address: string;
  phone: string;
}

export function generateUserData(seed: number, lang: string, count: number): User[] {
  faker.seed(seed);
  const langModule = lang === 'RU' ? fakerRU : lang === 'KA_GE' ? fakerKA_GE : lang === 'JA' ? fakerJA : faker;

  const userData: User[] = [];

  for (let i = 0; i < count; i++) {
    const user: User = {
      id: i + 1,
      name: langModule.person.fullName(),
      address: langModule.location.streetAddress(),
      phone: langModule.phone.number(),
    };
    userData.push(user);
  }

  return userData;
}
