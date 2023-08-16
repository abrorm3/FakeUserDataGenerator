const { faker, fakerRU, fakerKA_GE, fakerJA } = require("@faker-js/faker");

function generateUserData(seed, lang, count) {
  faker.seed(seed);
  const langModule = lang === "RU" ? fakerRU : lang === "KA_GE" ? fakerKA_GE : lang === "JA" ? fakerJA : faker;

  const userData = [];

  for (let i = 0; i < count; i++) {
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

module.exports = {
  generateUserData,
};
