import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}`);
});
