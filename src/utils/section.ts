const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || `http://localhost:${port}`;

const baseURL = `${hostname}/public`;

export let section =
{
    id: 1,
    divider: "Fundamentos",
    units: [
        {
            id: 1,
            title: "Aprenda o que são frações",
            items: [
                {
                    id: 1,
                    item: 'content',
                    title: 'O que são frações?',
                    content: '<span>Frações são uma forma de representar partes de um todo ou divisões de uma quantidade. Elas são compostas por dois números separados por uma linha: o numerador (parte superior) e o denominador (parte inferior).</span><span><strong>Numerador:</strong> indica quantas partes estamos considerando.</span><span><strong>Denominador:</strong> indica em quantas partes o todo foi dividido.</span><span>Por exemplo, na fração 2/3, o numerador é 2 e o denominador é 3.</span>',
                    image: `${baseURL}/sections/fraction.png`,
                    description: 'Atividade 1',
                    disabled: false
                },
                {
                    id: 2,
                    item: 'activity',
                    type: 'dragdrop',
                    content: 'Dividi uma pizza em 8 fatias. Comi 1/2 dela. Quantas fatias de pizza eu comi?',
                    correctQtt: 4,
                    label: "🍕",
                    description: 'Atividade 2',
                    disabled: true
                },
                {
                    id: 3,
                    item: 'activity',
                    type: 'objective',
                    content: 'Qual fração é equivalente a 1/3?',
                    alternatives: [
                        { id: 1, label: '2/3' },
                        { id: 2, label: '3/3' },
                        { id: 3, label: '2/6' },
                        { id: 4, label: '3/6' }
                    ],
                    correctId: 3,
                    description: 'Atividade 3',
                    disabled: true
                },
                {
                    id: 4,
                    item: 'content',
                    title: 'Frações e Partes Iguais',
                    content: '<span>Quando dividimos algo igualmente, criamos frações. Cada parte tem o mesmo tamanho. Por exemplo, dividir uma pizza em 4 partes iguais cria partes de 1/4.</span>',
                    image: `${baseURL}/sections/equal_parts.png`,
                    description: 'Atividade 4',
                    disabled: true
                },
                {
                    id: 5,
                    item: 'activity',
                    type: 'objective',
                    content: 'Quantas partes iguais estão na fração 3/4?',
                    alternatives: [
                        { id: 1, label: '4 partes' },
                        { id: 2, label: '3 partes' },
                        { id: 3, label: '2 partes' },
                        { id: 4, label: '1 parte' }
                    ],
                    correctId: 1,
                    description: 'Atividade 5',
                    disabled: true
                }
            ]
        },
        {
            id: 2,
            title: "Aprenda a representar e comparar frações",
            items: [
                {
                    id: 6,
                    item: 'content',
                    title: 'Frações como Divisões',
                    content: '<span>Frações representam divisões. Por exemplo, 1/2 significa 1 dividido por 2. Esse conceito ajuda a entender como compartilhar algo em partes iguais.</span>',
                    image: `${baseURL}/sections/division.png`,
                    description: 'Atividade 6',
                    disabled: true
                },
                {
                    id: 7,
                    item: 'activity',
                    type: 'dragdrop',
                    content: 'Tenho 12 maçãs. Comi 1/4 delas. Quantas maçãs eu comi?',
                    correctQtt: 3,
                    label: "🍎",
                    description: 'Atividade 7',
                    disabled: true
                },
                {
                    id: 8,
                    item: 'activity',
                    type: 'objective',
                    content: 'Que fração representa 3 partes de um bolo dividido em 4?',
                    alternatives: [
                        { id: 1, label: '3/4' },
                        { id: 2, label: '1/2' },
                        { id: 3, label: '2/3' },
                        { id: 4, label: '4/3' }
                    ],
                    correctId: 1,
                    description: 'Atividade 8',
                    disabled: true
                },
                {
                    id: 9,
                    item: 'content',
                    title: 'Comparação de Frações',
                    content: '<span>Frações podem ser comparadas para ver qual é maior ou menor. Por exemplo, 1/2 é maior que 1/3 porque duas partes são maiores que três partes do mesmo todo.</span>',
                    image: `${baseURL}/sections/comparison.png`,
                    description: 'Atividade 9',
                    disabled: true
                },
                {
                    id: 10,
                    item: 'activity',
                    type: 'objective',
                    content: 'Qual fração é maior: 1/2 ou 1/4?',
                    alternatives: [
                        { id: 1, label: '1/2' },
                        { id: 2, label: '1/4' },
                        { id: 3, label: 'Ambas são iguais' },
                        { id: 4, label: 'Nenhuma das alternativas' }
                    ],
                    correctId: 1,
                    description: 'Atividade 10',
                    disabled: true
                }
            ]
        }
    ]
};
