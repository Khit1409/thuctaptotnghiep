import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import authRouter from "./controllers/auth.controller.ts";
import appContentRouter from "./controllers/appcontent.controller.ts";

const app = express();

const corsOption = {
  origin: ["http://localhost:3000"],
};
// CORS phải nằm TRƯỚC các route
app.use(cors(corsOption));
app.use(express.json());

// Router
app.use("/api/auth", authRouter);
app.use("/api/content", appContentRouter);
const PORT = process.env.PORT;
//run
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
