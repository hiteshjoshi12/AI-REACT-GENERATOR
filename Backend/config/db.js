import mongoose from "mongoose";
export const ConnectDb = async () => {
  await mongoose
    .connect(process.env.VITE_APP_MOGO_URI)
    .then(() => console.log("Database connected"));
};
