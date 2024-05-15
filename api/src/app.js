import express, { json } from "express";
import contactController from "./controllers/contact.js";
import contactControllerAdmin from "./controllers/admin/contact.js";
import cors from "cors";

const app = express();
const PORT = 3000;
const HOST = "0.0.0.0";

app.use(cors());
app.use(json());
app.use("/contact", contactController);
app.use("/admin/contact", contactControllerAdmin);

//  app.listen(8000);

app.get("/", (req, res) => {
	res.send("DOCKER APP DEMO: OK");
});
app.listen(PORT, HOST, () => {
	console.log(`Le serveur ecoute sur http: /${HOST}:${PORT}`);
});
