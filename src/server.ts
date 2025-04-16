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
import morgan from "morgan"
const app = express();


app.use(morgan("dev"))
app.get("/", (req, res) => {
  res.statusCode=200;
  res.json({ message: "hello from express" });
});

app.use("/api", router);

export default app;
