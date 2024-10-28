import { Request, Response, Router } from "express";
import registry from "../../core/provider-registry";
import UserService from "../services/user.service";
import quizModel from "../models/quiz.model";

const routes = Router();

routes.get('/:id', async (req: Request, res: Response) => {
    const service = registry.get<UserService>(UserService.name);
    const id = req.params.id;
    quizModel.insertMany({
        title: 'dsdsd',
        description: 'dsds'
    });
    const userDetails = await service.findByUid(id);
    res.json({ userDetails });
});

export default routes;