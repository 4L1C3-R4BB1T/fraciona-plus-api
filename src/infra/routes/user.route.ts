import { Request, Response, Router } from "express";
import registry from "../../core/provider-registry";
import UserService from "../services/user.service";

const routes = Router();

routes.get('/:id', async (req: Request, res: Response) => {
    const service = registry.get<UserService>(UserService.name);
    const id = req.params.id;
    const userDetails = await service.findByUid(id);
    res.json({ userDetails });
});

export default routes;