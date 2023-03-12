import mongoose from "mongoose";
import dotenv from "dotenv";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "config.env" });
import app from "./app.js";

if (!process.env.DATABASE)
  throw new Error(`The mongodb database wasn't specified!`);
if (!process.env.DATABASE_PASSWORD)
  throw new Error(`The mongodb database's password wasn't specified!`);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

(async () => {
  await mongoose
    .connect(
      DB /*{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }*/
    )
    .then(() => console.log("DB connection successful!"));

  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });

  process.on("unhandledRejection", (err: any) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
})();
