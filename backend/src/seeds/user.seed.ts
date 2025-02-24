import { config } from "dotenv";
import { connectDB } from "../lib/db";
import User from "../models/user.model";


consfig();
interface AuthDetails {
	email: string;
	name: string;
	password: string;
	profilePic?: string;
}

// todo: add users lists
const seedUsers: AuthDetails = [

];

const seedDB = async () => {
	try {
		await connectDB();

		await User.inertMany(seedUsers);
		console.log("Database seed completed successfully");
	} catch (error) {
		console.error("[seedDB]: Error seeding database: ", error);
	}
}
