import { Router, Request, Response } from "express";
import { getToken, getUser, listAvailableUsers } from './external/index';
import { addActive, listActive, removeActive } from './database/active';
const tagMap = require('../shared/map.json');

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
        userIds: listActive(req.query.token)
    });
});

// POST parameters: {insecurty, token}
apiRoutes.put('/active/:userId', async (req: Request, res: Response) => {
    try {
        let tags = new Set<string>();
        const insecurities = req.body.insecurities.split(/\s+/);
        for (const insecurity of insecurities) {
            if (tagMap[insecurity]) tags.add(tagMap[insecurity]);
        }

        addActive(req.body.token, req.params.userId, {
            tags: Array.from(tags),
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
