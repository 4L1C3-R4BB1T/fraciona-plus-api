import { Request, Response, Router } from "express";
import challengeModel from "../models/challenge.model";

const routes = Router();

// Rota para obter todos os desafios
routes.get('/', async (req: Request, res: Response) => {
    const difficulty = req.query.difficulty;
    const filter = difficulty !== '0' ? { difficulty } : {};    
    try {
        const challenges = await challengeModel.find(filter);
        const challengesWithExp = challenges.map((challenge) => ({
            ...challenge.toObject(),
            exp: (challenge.questions?.length || 0) * 5
        }));
        res.status(200).json(challengesWithExp);
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter desafios" });
    }
});

// Rota para obter um desafio por ID
routes.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const challenge = await challengeModel.findById(id);
        if (!challenge) {
            return res.status(404).json({ message: "Desafio não encontrado" });
        }
        res.status(200).json(challenge);
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter desafio" });
    }
});

export default routes;