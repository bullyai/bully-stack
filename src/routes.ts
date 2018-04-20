import { Router } from "express";
import * as path from "path";

const routes = Router();
export { routes };

routes.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/main.html"));
});