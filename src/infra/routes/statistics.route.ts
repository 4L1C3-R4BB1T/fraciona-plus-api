import { Request, Response, Router } from "express";
import userStatisticsModel from "../models/user_statistics.model";

const routes = Router();

// Rota para criar estatísticas do usuário ao criar uma conta
routes.post('/create', async (req: Request, res: Response) => {
    try {
        const userId = req['user'].uid;

        const userStatistics = await userStatisticsModel.create({
            userId: userId,
            correctAnswers: 0,
            wrongAnswers: 0,
            qttAchievements: 0,
            totalExp: 0
        });

        res.status(201).json(userStatistics);
    } catch (error) {
        console.error('Erro ao criar conta do usuário e salvar estatísticas:', error);
        res.status(500).json({ error: 'Erro ao criar conta do usuário e salvar estatísticas.' });
    }
});

// Rota para atualizar estatísticas do usuário
routes.put('/update', async (req: Request, res: Response) => {
    try {
        const userId = req['user'].uid;        
        const { correctAnswers, wrongAnswers, qttAchievements, totalExp } = req.body;

        const updatedStatistics = await userStatisticsModel.findOneAndUpdate(
            { userId: userId },
            {
                $inc: {
                    correctAnswers: correctAnswers || 0,
                    wrongAnswers: wrongAnswers || 0,
                    qttAchievements: qttAchievements || 0,
                    totalExp: totalExp || 0,
                }
            },
            { new: true }
        );

        if (!updatedStatistics) {
            return res.status(404).json({ message: 'Estatísticas não encontradas para o usuário.' });
        }

        res.json(updatedStatistics);
    } catch (error) {
        console.error('Erro ao atualizar estatísticas do usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar estatísticas do usuário.' });
    }
});

// Rota para buscar estatísticas do usário pelo ID
routes.get('/user', async (req: Request, res: Response) => {
    try {
        const userId = req['user'].uid;
        const userStatistics = await userStatisticsModel.findOne({ userId });

        if (!userStatistics) {
            return res.status(404).json({ error: 'Estatísticas do usuário não encontradas.' });
        }

        res.json(userStatistics);
    } catch (error) {
        console.error('Erro ao buscar estatísticas do usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar estatísticas do usuário.' });
    }
});

export default routes;