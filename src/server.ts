require("dotenv").config();
import { Request, Response } from "express";
const express = require("express"),
  app = express(),
  port = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
