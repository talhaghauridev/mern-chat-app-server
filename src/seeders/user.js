const { faker } = require("@faker-js/faker");
const User = require("../models/userModel")

const createUser = async (numberUsers) => {
  try {
    const usersPromise = [];

    for (let i = 0; i < numberUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      usersPromise.push(tempUser);
    }

    await Promise.all(usersPromise);

    console.log("Users created", numberUsers);
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = {
  createUser,
};
