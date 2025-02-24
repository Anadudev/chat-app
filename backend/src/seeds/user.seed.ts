import { config } from "dotenv";
import { connectDB } from "../lib/db";
import User from "../models/user.model";
// Todo: install faker package
import { faker } from '@faker-js/faker';

config();

interface AuthDetails {
	email: string;
	name: string;
	password: string;
	profilePic?: string;
}


const seedUsers: AuthDetails[] = Array.from({ length: 20 }).map(() => ({
	email: faker.internet.email(),
	name: faker.name.findName(),
	password: faker.internet.password(),
	profilePic: faker.image.avatar(),
}));

const seedDB = async () => {
	try {
		await connectDB();

		await User.insertMany(seedUsers);
		console.log("Database seed completed successfully");
	} catch (error) {
		console.error("[seedDB]: Error seeding database: ", error);
	}
}
