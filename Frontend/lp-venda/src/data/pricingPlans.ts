

export interface PricingPlan {
  id: string,
  title: string,
  price: string,
  plays: string,
  videoLimit: string,
  playExtra: string,
  isPopular: boolean,
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'price_1RS0ZXHs4q3jg2YIJWSBIDmn',
    title: 'Essencial',
    price: 'R$ 89,90',
    plays: '6000 Plays',
    videoLimit: 'limite de acervo 20 vídeos',
    playExtra: 'Play adicional 0,05',
    isPopular: false
  },
  {
    id: 'price_1RS0ajHs4q3jg2YIJvRrQ4zm',
    title: 'Profissional',
    price: 'R$ 249,90',
    plays: '25000 Plays',
    videoLimit: 'limite de acervo 50 vídeos',
    playExtra: 'Play adicional 0,03',
    isPopular: true
  },
  {
    id: 'price_1RykTQHs4q3jg2YIjzyIno8D',
    title: 'Empresarial',
    price: 'R$ 499,90',
    plays: '50000 Plays',
    videoLimit: 'limite de acervo 100 vídeos',
    playExtra: 'Play adicional 0,02',
    isPopular: false
  }
]