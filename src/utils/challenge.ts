import challengeModel from "../infra/models/challenge.model";

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const baseURL = `http://${host}:${port}/public`;

const challenges = [
    {
        title: 'Quebra-Fração',
        difficulty: 3,
        exp: 30,
        image: `${baseURL}/challenges/puzzle.png`,
        questions: [
            {
                type: 'objective',
                content: 'Que fração representa 1 parte da pizza?',
                image: 'pizza.png',
                alternatives: [
                    { id: 1, label: '1/1' },
                    { id: 2, label: '1/8' },
                    { id: 3, label: '1/2' },
                    { id: 4, label: '1/4' }
                ],
                correctId: 2
            },
            {
                type: 'objective',
                content: 'Qual fração é equivalente a 1/3?',
                alternatives: [
                    { id: 1, label: '2/3' },
                    { id: 2, label: '3/3' },
                    { id: 3, label: '2/6' },
                    { id: 4, label: '3/6' }
                ],
                correctId: 3
            }
        ]
    },
];

export async function populateChallenges() {
    try {
        const count = await challengeModel.countDocuments({});
        if (count === 0) {
            await challengeModel.insertMany(challenges);
            console.log("Dados populados com sucesso!");
        } else {
            console.log("A collection challenges já possui dados.");
        }
    } catch (err) {
        console.error("Erro ao popular a collection:", err);
    }
}


// {
//       id: '1',
//       title: 'Quebra-Fração',
//       difficulty: 3,
//       exp: 30,
//       image: 'puzzle.png'
//     },
//     {
//       id: '2',
//       title: 'Primeiros Passos',
//       difficulty: 1,
//       exp: 10,
//       image: 'baby.png'
//     },
//     {
//       id: '3',
//       title: 'Mestre das Frações',
//       difficulty: 2,
//       exp: 40,
//       image: 'wizard.png'
//     },
//     {
//       id: '4',
//       title: 'Calculadora Humana',
//       difficulty: 2,
//       exp: 45,
//       image: 'calculator.png'
//     },
//     {
//       id: '5',
//       title: 'A Grande Fração',
//       difficulty: 3,
//       exp: 35,
//       image: 'number.png'
//     },
//     {
//       id: '6',
//       title: 'Conhecimento Sólido',
//       difficulty: 1,
//       exp: 10,
//       image: 'stone.png'
//     }