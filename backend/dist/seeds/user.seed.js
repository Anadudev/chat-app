"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const db_1 = require("../lib/db");
const user_model_1 = __importDefault(require("../models/user.model"));
// Todo: install faker package
const faker_1 = require("@faker-js/faker");
(0, dotenv_1.config)();
const seedUsers = Array.from({ length: 20 }).map(() => ({
    email: faker_1.faker.internet.email(),
    name: faker_1.faker.person.firstName(),
    password: faker_1.faker.internet.password(),
    profilePic: faker_1.faker.image.avatar(),
}));
const seedDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        yield user_model_1.default.insertMany(seedUsers);
        console.log("Database seed completed successfully");
    }
    catch (error) {
        console.error("[seedDB]: Error seeding database: ", error);
    }
});
