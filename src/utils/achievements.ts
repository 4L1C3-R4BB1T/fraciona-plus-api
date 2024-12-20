import achievementsModel, { Achievement } from "../infra/models/achievements.model";

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || `http://localhost:${port}`;

const baseURL = `${hostname}/public`;

const achievements: Array<Achievement> = [
    {
        title: 'Primeiros Passos',
        description: 'Complete uma atividade',
        image: `${baseURL}/anchievements/baby.png`,
        color: '#39FF14',
        type: 'learning',
        goal: 1,
    },
    {
        title: 'Racha Cuca',
        description: 'Complete um desafio',
        image: `${baseURL}/anchievements/puzzle.png`,
        color: '#39FF14',
        type: 'challenge',
        goal: 1,
    },
    {
        title: 'Genial',
        description: 'Complete uma atividade sem erro',
        image: `${baseURL}/anchievements/brain.png`,
        color: '#00BFFF',
        type: 'no-error', 
        goal: 1,
    },
    {
        title: 'Desbravador',
        description: 'Complete 10 atividades',
        image: `${baseURL}/anchievements/explorer.png`,
        color: '#00BFFF',
        type: 'learning',
        goal: 10,
    },
    {
        title: 'Focado',
        description: 'Estude por 7 dias consecutivos',
        image: `${baseURL}/anchievements/marathon.png`,
        color: '#00BFFF',
        type: 'consecutive-days',
        goal: 7,
    },
    {
        title: 'Caixinha de Surpresas',
        description: 'Complete 10 desafios',
        image: `${baseURL}/anchievements/box.png`,
        color: '#8A2BE2',
        type: 'challenge',
        goal: 10,
    },
    {
        title: 'Grande Amigo',
        description: 'Participou do perído de testes do aplicativo',
        image: `${baseURL}/anchievements/graduation.png`,
        color: '#FF4500',
        type: 'trial-period',
        goal: 0,
    },
    {
        title: 'Estrela da Festa',
        description: 'Complete 100 atividades sem erros',
        image: `${baseURL}/anchievements/party.png`,
        color: '#8A2BE2',
        type: 'no-error',
        goal: 100,
    },
    {
        title: 'Mestre das Frações',
        description: 'Complete 200 atividades sem erros',
        image: `${baseURL}/anchievements/wizard.png`,
        color: '#8A2BE2',
        type: 'no-error',
        goal: 100,
    }
];

export async function populateAchievements() {
    try {
        const count = await achievementsModel.countDocuments({});
        if (count === 0) {
            await achievementsModel.insertMany(achievements);
            console.log("Dados populados com sucesso!");
        } else {
            console.log("A collection achievements já possui dados.");
        }
    } catch (err) {
        console.error("Erro ao popular a collection:", err);
    }
}