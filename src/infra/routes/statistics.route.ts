import { Request, Response, Router } from "express";
import { AuthUtil } from "../../utils/auth-util";
import userStatisticsModel from "../models/user_statistics.model";

const routes = Router();


// Rota para criar estatísticas do usuário ao criar uma conta
routes.post('/create', async (req: Request, res: Response) => {
    try {
        const userId = AuthUtil.getLoggedUser(req, 'uid');

        const userStatistics = await userStatisticsModel.create({
            userId: userId,
            correctAnswers: 0,
            wrongAnswers: 0,
            challengesCompleted: 0,
            qttAchievements: 0,
            totalExp: 0,
            offensive: 0
        });

        res.status(201).json(userStatistics);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar conta do usuário e salvar estatísticas.' });
    }
});

// Rota para atualizar estatísticas do usuário
// Rota para atualizar estatísticas do usuário
routes.put('/update', async (req: Request, res: Response) => {
    try {
        const userId = AuthUtil.getLoggedUser(req, 'uid');
        const { correctAnswers, wrongAnswers, challengesCompleted, qttAchievements, totalExp } = req.body;

        const userStatistics = await userStatisticsModel.findOne({ userId: userId });

        if (!userStatistics) {
            return res.status(404).json({ message: 'Estatísticas não encontradas para o usuário.' });
        }

        const currentDate = normalizeDate(new Date());
        const currentDateStr = currentDate.toDateString();

        // Verifica se já existe uma atividade registrada para a data atual
        const hasActivityToday = userStatistics.activities.some(
            (activity) => new Date(activity.date).toDateString() === currentDateStr
        );

        // Se já existe atividade para hoje, não adiciona nova atividade
        const activityUpdate = hasActivityToday ? {} : { $push: { activities: { date: currentDate } } };

        // Função para normalizar a data (zerar hora, minuto, segundo e milissegundo)
        function normalizeDate(date) {
            const normalized = new Date(date);
            normalized.setHours(0, 0, 0, 0); // Zera a hora, minuto, segundo e milissegundo
            return normalized;
        }

        // Normaliza as datas
        let lastOffensiveDate = normalizeDate(userStatistics.lastOffensiveDate);

        // Calcula a diferença em dias
        const dayDifference = lastOffensiveDate ? Math.floor((currentDate.getTime() - lastOffensiveDate.getTime()) / (1000 * 3600 * 24)) : null;
        let offensiveUpdate = userStatistics.offensive;

        if (dayDifference === null) {
            offensiveUpdate = 1;  // Se nunca houve ofensiva, inicializa como 1
        } else if (dayDifference > 1) {
            offensiveUpdate = 1; // Se ficou mais de um dia sem atividade, reseta a ofensiva para 1
        } else if (dayDifference === 1) {
            offensiveUpdate += 1;  // Se foi apenas um dia sem atividade, incrementa a ofensiva
        }

        // Atualização da última data de ofensiva se a ofensiva foi alterada
        if (offensiveUpdate > 1) {
            lastOffensiveDate = currentDate; // Atualiza a última data de ofensiva para a data atual
        }

        const updatedStatistics = await userStatisticsModel.findOneAndUpdate(
            { userId: userId },
            {
                $inc: {
                    correctAnswers: correctAnswers || 0,
                    wrongAnswers: wrongAnswers || 0,
                    challengesCompleted: challengesCompleted || 0,
                    qttAchievements: qttAchievements || 0,
                    totalExp: totalExp || 0
                },
                offensive: offensiveUpdate,
                lastOffensiveDate: currentDate,
                ...activityUpdate
            },
            { new: true }
        );

        if (!updatedStatistics) {
            return res.status(404).json({ message: 'Estatísticas não encontradas para o usuário.' });
        }

        console.log(updatedStatistics);
        res.json(updatedStatistics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar estatísticas do usuário.' });
    }
});


// Rota para buscar estatísticas do usário pelo ID
routes.get('/user', async (req: Request, res: Response) => {
    try {
        const userId = AuthUtil.getLoggedUser(req, 'uid');
        const userStatistics = await userStatisticsModel.findOne({ userId });

        if (!userStatistics) {
            return res.status(404).json({ error: 'Estatísticas do usuário não encontradas.' });
        }

        res.json(userStatistics);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar estatísticas do usuário.' });
    }
});

export default routes;