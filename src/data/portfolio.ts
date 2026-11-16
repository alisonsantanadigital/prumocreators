import lifestyleImg from '../assets/images/lifestyle_livia_martins_1794799600925.jpg';
import fashionImg from '../assets/images/fashion_marina_costa_1794799601160.jpg';
import beautyImg from '../assets/images/beauty_isabela_rocha_1794799601158.jpg';
import fitnessImg from '../assets/images/fitness_camila_mendes_1794799602039.jpg';
import realityFlowImg from '../assets/images/reality_flow_editorial_1794799602185.jpg';
import digitalCoutureImg from '../assets/images/digital_couture_editorial_1794799602225.jpg';
import beautyverseImg from '../assets/images/beautyverse_editorial_1794799602516.jpg';
import humanPerformanceImg from '../assets/images/human_performance_editorial_1794799602848.jpg';

export type CollectionId = 'creator-pro' | 'creator-pro-experience';

export interface PortfolioProject {
  id: string;
  index: string;
  collection: CollectionId;
  collectionLabel: string;
  name: string;
  category: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  /**
   * Endereço publicado do projeto individual.
   * Mantenha string vazia ("") para projetos ainda sem URL configurada.
   */
  url: string;
}

export interface PortfolioCollection {
  id: CollectionId;
  number: string;
  title: string;
  subtitle: string;
}

export const PORTFOLIO_COLLECTIONS: PortfolioCollection[] = [
  {
    id: 'creator-pro',
    number: '01',
    title: 'Creator Pro',
    subtitle: 'Apresentações digitais profissionais',
  },
  {
    id: 'creator-pro-experience',
    number: '02',
    title: 'Creator Pro Experience',
    subtitle: 'Experiências digitais com direção de arte autoral',
  },
];

/**
 * Configuração centralizada de links dos oito projetos do portfólio.
 * Para ativar um projeto em desenvolvimento, preencha o campo `url` com o link publicado.
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  // COLEÇÃO 01 — CREATOR PRO
  {
    id: 'creator-pro-lifestyle',
    index: '01',
    collection: 'creator-pro',
    collectionLabel: 'Creator Pro',
    name: 'Lifestyle — Lívia Martins',
    category: 'Lifestyle',
    shortDescription:
      'Apresentação comercial editorial estruturada para rotina, hospitalidade e parcerias de marca.',
    image: lifestyleImg,
    imageAlt: 'Lifestyle — Lívia Martins em ambiente arquitetônico contemporâneo',
    url: 'https://creator-pro-lifestyle.vercel.app/',
  },
  {
    id: 'creator-pro-fashion',
    index: '02',
    collection: 'creator-pro',
    collectionLabel: 'Creator Pro',
    name: 'Fashion — Marina Costa',
    category: 'Fashion',
    shortDescription:
      'Direção estética e posicionamento comercial para campanhas de moda e colaborações autorais.',
    image: fashionImg,
    imageAlt: 'Fashion — Marina Costa em arquitetura brutalista minimalista',
    url: 'https://creator-pro-fashion.vercel.app/',
  },
  {
    id: 'creator-pro-beauty',
    index: '03',
    collection: 'creator-pro',
    collectionLabel: 'Creator Pro',
    name: 'Beauty — Isabela Rocha',
    category: 'Beauty',
    shortDescription:
      'Arquitetura comercial desenhada para autoridade em skincare, perfumaria e campanhas de beleza.',
    image: beautyImg,
    imageAlt: 'Beauty — Isabela Rocha em retrato editorial de estúdio',
    url: 'https://creator-pro-beauty.vercel.app/',
  },
  {
    id: 'creator-pro-fitness',
    index: '04',
    collection: 'creator-pro',
    collectionLabel: 'Creator Pro',
    name: 'Fitness — Camila Mendes',
    category: 'Fitness',
    shortDescription:
      'Posicionamento estratégico para performance atlética, bem-estar e marcas esportivas.',
    image: fitnessImg,
    imageAlt: 'Fitness — Camila Mendes em cena atlética de estúdio arquitetônico',
    url: 'https://creator-pro-fitness.vercel.app/',
  },

  // COLEÇÃO 02 — CREATOR PRO EXPERIENCE
  {
    id: 'experience-reality-flow',
    index: '01',
    collection: 'creator-pro-experience',
    collectionLabel: 'Creator Pro Experience',
    name: 'Reality Flow — Lifestyle',
    category: 'Lifestyle',
    shortDescription:
      'Experiência digital contínua com narrativa visual fluida e direção editorial contemporânea.',
    image: realityFlowImg,
    imageAlt: 'Reality Flow — Lifestyle em terraço mediterrâneo sob luz natural',
    url: 'https://prumo-creators-creator-pro-experien.vercel.app/',
  },
  {
    id: 'experience-digital-couture',
    index: '02',
    collection: 'creator-pro-experience',
    collectionLabel: 'Creator Pro Experience',
    name: 'Digital Couture — Fashion',
    category: 'Fashion',
    shortDescription:
      'Editorial interativo de alta moda onde silhueta, ritmo visual e arquitetura definem o discurso.',
    image: digitalCoutureImg,
    imageAlt: 'Digital Couture — Fashion em vestido plissado escultural',
    url: '',
  },
  {
    id: 'experience-beautyverse',
    index: '03',
    collection: 'creator-pro-experience',
    collectionLabel: 'Creator Pro Experience',
    name: 'Beautyverse — Beauty',
    category: 'Beauty',
    shortDescription:
      'Ambiente sensorial digital dedicado a texturas, luz natural e estética editorial de beleza.',
    image: beautyverseImg,
    imageAlt: 'Beautyverse — Beauty em composição minimalista sobre calcário',
    url: '',
  },
  {
    id: 'experience-human-performance',
    index: '04',
    collection: 'creator-pro-experience',
    collectionLabel: 'Creator Pro Experience',
    name: 'Human Performance — Fitness',
    category: 'Fitness',
    shortDescription:
      'Experiência visual orientada por movimento, disciplina e linguagem esportiva contemporânea.',
    image: humanPerformanceImg,
    imageAlt: 'Human Performance — Fitness em átrio arquitetônico iluminado',
    url: '',
  },
];
