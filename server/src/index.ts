import "dotenv/config";
import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}`);
});
