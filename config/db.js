import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL);
		console.log(`MongoDB connected:${conn.connection.host}`.bgMagenta);
	} catch (error) {
		console.log(error);
	}
};
