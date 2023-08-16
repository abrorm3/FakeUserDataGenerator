import { faker, fakerRU, fakerKA_GE, fakerJA } from '@faker-js/faker';
// import * as crypto from "crypto-js";
import { enc, MD5 } from 'crypto-js';

interface User {
  id: string;
  name: string;
  address: string;
  phone: string;
}
const ID_LENGTH = 25;
export function generateUniqueID(...values: string[]): string {
  const hash = MD5(values.join('')).toString(enc.Hex);
  return hash.substring(0, ID_LENGTH);
}
export function generateUserData(
  seed: number,
  lang: string,
  count: number
): User[] {
  const userData: User[] = [];

  let langModule: any;
  console.log(lang + ' LANGGGG');

  if (lang === 'RU') {
    fakerRU.seed(seed);
    langModule = fakerRU;
  } else if (lang === 'KA_GE') {
    fakerKA_GE.seed(seed);
    langModule = fakerKA_GE;
  } else if (lang === 'JA') {
    fakerJA.seed(seed);
    langModule = fakerJA;
  } else {
    faker.seed(seed);
    langModule = faker;
  }

  for (let i = 0; i < count; i++) {
    const fullName = langModule.person.fullName();
    const streetAddress = langModule.location.streetAddress();
    const phoneNumber = langModule.phone.number();

    const id = generateUniqueID(fullName, streetAddress, phoneNumber);

    const user: User = {
      id,
      name: fullName,
      address: streetAddress,
      phone: phoneNumber,
    };
    userData.push(user);
  }

  return userData;
}
