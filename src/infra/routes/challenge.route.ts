import { Request, Response, Router } from "express";

import challengeModel from "../models/challenge.model";

const routes = Router();

// Rota para obter todos os desafios
routes.get('/', async (req: Request, res: Response) => {
    try {
        const challenges = await challengeModel.find().select('-questions');;
        res.status(200).json(challenges);
    } catch (error) {
        console.error("Erro ao obter desafios:", error);
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
        console.error("Erro ao obter desafio:", error);
        res.status(500).json({ message: "Erro ao obter desafio" });
    }
});

export default routes;