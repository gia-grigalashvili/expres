// import express from "express";
// import router from "./router";

// const app = express();
// const port = 3001;
// app.get("/", async (req, res) => {
//   res.statusCode = 200;
//   res.json({ message: "hello from express" });
// });

// app.use("/api", router);

// // module.exports = app;

// export default app;

import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"], // რაც მეთოდები გინდა, რომ იყოს ხელმისაწვდომი
  allowedHeaders: ["Content-Type", "Authorization"], // რასაც მიეცემა ნებართვა
};

// CORS middleware-ი
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   const userMessage = req.body;
//   console.log(userMessage); // ლოგები
//   next(); // აუცილებელია რომ შემდეგი ნაბიჯი გაგრძელდეს
// });

// app.get("/", (req, res) => {
//   res.statusCode = 200;
//   res.json({ message: "hello from express" });
// });

// API routes
app.use("/api", protect, router);

export default app;
