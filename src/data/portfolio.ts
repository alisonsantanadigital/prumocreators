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
  creatorOrFocus: string;
  category: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  /**
   * URL publicada do projeto individual.
   * Deixe como string vazia ("") para projetos ainda em desenvolvimento.
   */
  url: string;
}

export interface PortfolioCollection {
  id: CollectionId;
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export const PORTFOLIO_COLLECTIONS: PortfolioCollection[] = [
  {
    id: 'creator-pro',
    number: '01',
    title: 'Creator Pro',
    subtitle: 'Apresentações comerciais',
    description:
      'Páginas comerciais de estética editorial desenhadas para traduzir identidade, território criativo e propostas de parceria para marcas.',
  },
  {
    id: 'creator-pro-experience',
    number: '02',
    title: 'Creator Pro Experience',
    subtitle: 'Experiências digitais avançadas',
    description:
      'Narrativas digitais imersivas com direção de arte autoral, ritmo cinematográfico e composição interativa sob medida.',
  },
];

/**
 * Estrutura centralizada de portfólio da Prumo Creators.
 * Para publicar um projeto pendente, basta preencher o campo `url` com o endereço oficial.
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  // COLEÇÃO 01 — CREATOR PRO
  {
    id: 'creator-pro-lifestyle',
    index: '01',
    collection: 'creator-pro',
    collectionLabel: 'Creator Pro',
    name: 'Lifestyle — Lívia Martins',
    creatorOrFocus: 'Lívia Martins',
    category: 'Lifestyle',
    shortDescription:
      'Apresentação comercial com curadoria editorial de rotina, hospitalidade e parcerias para marcas de estilo de vida.',
    image: lifestyleImg,
    imageAlt: 'Editorial Lifestyle — Lívia Martins em ambiente arquitetônico iluminado',
    url: 'https://creator-pro-lifestyle.vercel.app/',
  },
  {
    id: 'creator-pro-fashion',
    index: '02',
    collection: 'creator-pro',
    collectionLabel: 'Creator Pro',
    name: 'Fashion — Marina Costa',
    creatorOrFocus: 'Marina Costa',
    category: 'Fashion',
    shortDescription:
      'Vitrine de posicionamento em moda autoral com foco em direção estética, editoriais e campanhas contemporâneas.',
    image: fashionImg,
    imageAlt: 'Editorial Fashion — Marina Costa em arquitetura brutalista de concreto',
    url: 'https://creator-pro-fashion.vercel.app/',
  },
  {
    id: 'creator-pro-beauty',
    index: '03',
    collection: 'creator-pro',
    collectionLabel: 'Creator Pro',
    name: 'Beauty — Isabela Rocha',
    creatorOrFocus: 'Isabela Rocha',
    category: 'Beauty',
    shortDescription:
      'Estrutura comercial desenhada para conectar autoridade em skincare, perfumaria e campanhas de beleza.',
    image: beautyImg,
    imageAlt: 'Editorial Beauty — Isabela Rocha com iluminação natural de estúdio',
    url: 'https://creator-pro-beauty.vercel.app/',
  },
  {
    id: 'creator-pro-fitness',
    index: '04',
    collection: 'creator-pro',
    collectionLabel: 'Creator Pro',
    name: 'Fitness — Camila Mendes',
    creatorOrFocus: 'Camila Mendes',
    category: 'Fitness',
    shortDescription:
      'Posicionamento estratégico para performance atlética, bem-estar e colaborações com marcas esportivas.',
    image: fitnessImg,
    imageAlt: 'Editorial Fitness — Camila Mendes em cena atlética de alto contraste',
    url: 'https://creator-pro-fitness.vercel.app/',
  },

  // COLEÇÃO 02 — CREATOR PRO EXPERIENCE
  {
    id: 'experience-reality-flow',
    index: '01',
    collection: 'creator-pro-experience',
    collectionLabel: 'Creator Pro Experience',
    name: 'Reality Flow',
    creatorOrFocus: 'Lifestyle',
    category: 'Lifestyle',
    shortDescription:
      'Experiência digital contínua que transforma cotidiano, curadoria e narrativa visual em uma jornada editorial fluida.',
    image: realityFlowImg,
    imageAlt: 'Editorial Reality Flow com silhueta em linho sob luz natural mediterrânea',
    url: 'https://prumo-creators-creator-pro-experien.vercel.app/',
  },
  {
    id: 'experience-digital-couture',
    index: '02',
    collection: 'creator-pro-experience',
    collectionLabel: 'Creator Pro Experience',
    name: 'Digital Couture',
    creatorOrFocus: 'Fashion',
    category: 'Fashion',
    shortDescription:
      'Editorial interativo de alta moda onde silhueta, alfaiataria arquitetônica e direção visual elevam o discurso de marca.',
    image: digitalCoutureImg,
    imageAlt: 'Editorial Digital Couture com vestido plissado escultural em galeria minimalista',
    url: '',
  },
  {
    id: 'experience-beautyverse',
    index: '03',
    collection: 'creator-pro-experience',
    collectionLabel: 'Creator Pro Experience',
    name: 'Beautyverse',
    creatorOrFocus: 'Beauty',
    category: 'Beauty',
    shortDescription:
      'Ambiente sensorial editorial para apresentação de texturas, campanhas e narrativas visuais no universo beauty.',
    image: beautyverseImg,
    imageAlt: 'Editorial Beautyverse com perfil minimalista sobre calcário bruto e luz natural',
    url: '',
  },
  {
    id: 'experience-human-performance',
    index: '04',
    collection: 'creator-pro-experience',
    collectionLabel: 'Creator Pro Experience',
    name: 'Human Performance',
    creatorOrFocus: 'Fitness',
    category: 'Fitness',
    shortDescription:
      'Experiência orientada por movimento, disciplina e estética contemporânea para creators de alta performance.',
    image: humanPerformanceImg,
    imageAlt: 'Editorial Human Performance em movimento dentro de átrio arquitetônico iluminado',
    url: '',
  },
];
