import express from "express";
import router from "./routes";

const app = express();

const PORT = 8080 || process.env.PORT;

//Middleware

//Routes
app.use("/api", router);

app
  .listen(PORT, () => {
    console.log(`Connected on port: ${PORT}`);
  })
  .on("error", (err: Error) => {
    console.log(err);
  });
