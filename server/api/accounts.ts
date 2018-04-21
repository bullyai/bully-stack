import { Router, Request, Response } from "express";
import { getToken } from '../external';

const accountRoutes = Router();
export { accountRoutes };

// Account Related
// ----------------------------------------------------------------------------
accountRoutes.post('/login', async (req: Request, res: Response) => {
    try {
        const token = await getToken(req.body.email, req.body.password);
        res.json({
            success: true,
            token
        });
    } catch (error) {
        res.json({
            success: false,
            error
        });
    }
});
