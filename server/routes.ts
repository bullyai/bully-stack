import { Router, Request, Response } from "express";
import * as path from "path";

const routes = Router();
export { routes };

// General
// ----------------------------------------------------------------------------
routes.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "./../client/main.html"));
});