import express from "express";

const app = express();

const PORT = 8080 || process.env.PORT;

app
  .listen(PORT, () => {
    console.log(`Connected on port: ${PORT}`);
  })
  .on("error", (err: Error) => {
    console.log(err);
  });