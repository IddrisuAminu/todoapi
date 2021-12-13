import mongoose from "mongoose";
const connectDB = async () => {
  return await mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
    })
    .then(() => console.log("connected to the db"))
    .catch((err) => console.log("err"));
};
export { connectDB };
