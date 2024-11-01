import challengeModel from "../infra/models/challenge.model";

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const baseURL = `http://${host}:${port}/public`;

const challenges = [
    {
        title: "Quebra-Fração",
        difficulty: 3,
        image: `${baseURL}/challenges/puzzle.png`,
        questions: [
            {
                type: "objective",
                content: "Que fração representa 1 parte da pizza?",
                image: `${baseURL}/questions/pizza.png`,
                alternatives: [
                    { id: 1, label: "1/1" },
                    { id: 2, label: "1/8" },
                    { id: 3, label: "1/2" },
                    { id: 4, label: "1/4" }
                ],
                correctId: 2
            },
            {
                type: "objective",
                content: "Qual fração é equivalente a 1/3?",
                alternatives: [
                    { id: 1, label: "2/3" },
                    { id: 2, label: "3/3" },
                    { id: 3, label: "2/6" },
                    { id: 4, label: "3/6" }
                ],
                correctId: 3
            },
            {
                type: "objective",
                content: "Se uma barra de chocolate é dividida em 4 partes iguais e você come 1 parte, qual fração representa a parte que você comeu?",
                alternatives: [
                    { id: 1, label: "1/4" },
                    { id: 2, label: "1/3" },
                    { id: 3, label: "1/2" },
                    { id: 4, label: "3/4" }
                ],
                correctId: 1
            },
            {
                type: "objective",
                content: "Qual fração representa metade de um bolo dividido em 6 partes iguais?",
                alternatives: [
                    { id: 1, label: "3/6" },
                    { id: 2, label: "1/6" },
                    { id: 3, label: "2/6" },
                    { id: 4, label: "1/2" }
                ],
                correctId: 1
            },
            {
                type: "objective",
                content: "Qual fração é equivalente a 2/4?",
                alternatives: [
                    { id: 1, label: "1/2" },
                    { id: 2, label: "3/4" },
                    { id: 3, label: "4/8" },
                    { id: 4, label: "2/8" }
                ],
                correctId: 1
            },
            {
                type: "objective",
                content: "Qual fração é maior: 1/3 ou 1/4?",
                alternatives: [
                    { id: 1, label: "1/3" },
                    { id: 2, label: "1/4" }
                ],
                correctId: 1
            },
            {
                type: "objective",
                content: "Em uma pizza dividida em 8 partes, se você come 3 partes, qual fração representa a quantidade que você comeu?",
                alternatives: [
                    { id: 1, label: "3/8" },
                    { id: 2, label: "3/4" },
                    { id: 3, label: "1/2" },
                    { id: 4, label: "5/8" }
                ],
                correctId: 1
            }
        ]
    },
    {
        title: 'Primeiros Passos',
        difficulty: 1,
        image: `${baseURL}/challenges/baby.png`,
        questions: [
            {
                type: 'objective',
                content: 'Qual fração representa metade de um biscoito dividido em 2 partes iguais?',
                image: `${baseURL}/questions/cookie.png`,
                alternatives: [
                    { id: 1, label: '1/4' },
                    { id: 2, label: '1/2' },
                    { id: 3, label: '1/3' },
                    { id: 4, label: '1/1' }
                ],
                correctId: 2
            },
            {
                type: 'objective',
                content: 'Se você tem uma barra de chocolate dividida em 4 partes e comeu 1 parte, qual fração representa o que você comeu?',
                image: `${baseURL}/questions/chocolate.png`,
                alternatives: [
                    { id: 1, label: '1/4' },
                    { id: 2, label: '1/2' },
                    { id: 3, label: '1/3' },
                    { id: 4, label: '1/8' }
                ],
                correctId: 1
            }
        ]
    },
    {
        title: 'Mestre das Frações',
        difficulty: 2,
        image: `${baseURL}/challenges/wizard.png`,
        questions: [
            {
                type: 'objective',
                content: 'Qual das frações abaixo é equivalente a 2/4?',
                alternatives: [
                    { id: 1, label: '1/2' },
                    { id: 2, label: '3/4' },
                    { id: 3, label: '1/4' },
                    { id: 4, label: '2/3' }
                ],
                correctId: 1
            },
            {
                type: 'objective',
                content: 'Simplifique a fração 4/8.',
                alternatives: [
                    { id: 1, label: '2/8' },
                    { id: 2, label: '1/2' },
                    { id: 3, label: '4/4' },
                    { id: 4, label: '2/4' }
                ],
                correctId: 2
            }
        ]
    },
    {
        title: 'Calculadora Humana',
        difficulty: 2,
        image: `${baseURL}/challenges/calculator.png`,
        questions: [
            {
                type: 'objective',
                content: 'Qual é o resultado de 1/3 + 1/3?',
                alternatives: [
                    { id: 1, label: '1/2' },
                    { id: 2, label: '2/3' },
                    { id: 3, label: '1' },
                    { id: 4, label: '3/3' }
                ],
                correctId: 2
            },
            {
                type: 'objective',
                content: 'Qual é o valor decimal aproximado de 1/8?',
                alternatives: [
                    { id: 1, label: '0.5' },
                    { id: 2, label: '0.75' },
                    { id: 3, label: '0.125' },
                    { id: 4, label: '0.25' }
                ],
                correctId: 3
            }
        ]
    },
    {
        title: 'A Grande Fração',
        difficulty: 3,
        image: `${baseURL}/challenges/number.png`,
        questions: [
            {
                type: 'objective',
                content: 'Qual fração representa 75%?',
                alternatives: [
                    { id: 1, label: '1/4' },
                    { id: 2, label: '3/4' },
                    { id: 3, label: '2/3' },
                    { id: 4, label: '1/2' }
                ],
                correctId: 2
            },
            {
                type: 'objective',
                content: 'Qual fração é maior: 5/6 ou 7/8?',
                alternatives: [
                    { id: 1, label: '5/6' },
                    { id: 2, label: '7/8' },
                    { id: 3, label: 'Ambas são iguais' },
                    { id: 4, label: 'Nenhuma das opções' }
                ],
                correctId: 2
            }
        ]
    },
    {
        title: 'Conhecimento Sólido',
        difficulty: 1,
        image: `${baseURL}/challenges/stone.png`,
        questions: [
            {
                type: 'objective',
                content: 'Qual fração representa uma pizza inteira?',
                image: `${baseURL}/questions/whole_pizza.png`,
                alternatives: [
                    { id: 1, label: '1/2' },
                    { id: 2, label: '1/4' },
                    { id: 3, label: '1' },
                    { id: 4, label: '2/3' }
                ],
                correctId: 3
            },
            {
                type: 'objective',
                content: 'Qual fração representa um terço?',
                alternatives: [
                    { id: 1, label: '1/2' },
                    { id: 2, label: '1/3' },
                    { id: 3, label: '1/4' },
                    { id: 4, label: '1' }
                ],
                correctId: 2
            }
        ]
    }
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
