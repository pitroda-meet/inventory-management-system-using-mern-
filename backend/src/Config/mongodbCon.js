import mongoose from "mongoose";

const mongodbCon = async () => {
  return await mongoose
    .connect(
      `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.k2vouiz.mongodb.net/inventry`
    )
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((err) => console.error(err));
};

export default mongodbCon;
