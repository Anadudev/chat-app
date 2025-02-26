var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { config } from "dotenv";
import { connectDB } from "../lib/db";
import User from "../models/user.model";
import { faker } from '@faker-js/faker';
config();
const seedUsers = Array.from({ length: 20 }).map(() => ({
    email: faker.internet.email(),
    name: faker.person.firstName(),
    password: faker.internet.password(),
    profilePic: faker.image.avatar(),
}));
const seedDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB();
        yield User.insertMany(seedUsers);
        console.log("Database seed completed successfully");
    }
    catch (error) {
        console.error("[seedDB]: Error seeding database: ", error);
    }
});
