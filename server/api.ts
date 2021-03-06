import { Router, Request, Response } from "express";
import { getToken, getUser, listAvailableUsers } from './external/index';
import { addActive, getActive, listActive, removeActive } from './database/active';

const apiRoutes = Router();
export { apiRoutes };

// POST parameters: {email, password}
apiRoutes.post('/login', async (req: Request, res: Response) => {
    try {
        console.log('Request', req.body);
        const token = await getToken(req.body.email, req.body.password);
        res.json({
            success: true,
            token
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
});

// GET parameters: {token}
apiRoutes.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await listAvailableUsers(req.query.token);
        res.json({
            success: true,
            users
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
});

// GET parameters: {token}
apiRoutes.get('/active', async (req: Request, res: Response) => {
    res.json({
        success: true,
        users: listActive(req.query.token)
    });
});

// GET parameters: {token}
apiRoutes.get('/active/:userId', async (req: Request, res: Response) => {
    try {
        const result = getActive(req.query.token, req.params.userId);
        if (!result) throw new Error("No");
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
});

// POST parameters: {insecurty, gender, token}
apiRoutes.put('/active/:userId', async (req: Request, res: Response) => {
    try {
        addActive(req.body.token, req.params.userId, {
            tags: (req.body.insecurities + ' misc').toLowerCase().trim().split(/\s+/) as string[],
            gender: req.body.gender,
            info: await getUser(req.body.token, req.params.userId)
        });
        res.json({ success: true });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
});

// POST parameters: {token}
apiRoutes.delete('/active/:userId', async (req: Request, res: Response) => {
    try {
        removeActive(req.body.token, req.params.userId);
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
});
