interface Metric {
    id: string;
    finalValue: number;
    label: string;
    type: 'number' | 'percentage';
    prefix?: string;
}


export const metricsData: Metric[] = [
    {
        id: 'views',
        finalValue: 1200000,
        label: 'de visualizações dos vídeos criados aqui',
        type: 'number',
        prefix: '+'
    },
    {
        id: 'satisfaction',
        finalValue: 93,
        label: 'taxa de satisfação',
        type: 'percentage',
    },
    {
        id: 'rating',
        finalValue: 4.9,
        label: 'de 5.0 de avaliação dos nossos clientes',
        type: 'number',
    },
];