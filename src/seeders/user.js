import { faker } from "@faker-js/faker";
import User from "../models/userModel.js";
import dotenv from "dotenv";
import connectDB from "../db/index.js";

dotenv.config();

const createUser = async (numberUsers) => {
  try {
    await connectDB();
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

export { createUser };
