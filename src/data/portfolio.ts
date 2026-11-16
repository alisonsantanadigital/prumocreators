import lifestyleImg from '../assets/images/lifestyle_livia_martins_1794793899244.jpg';
import fashionImg from '../assets/images/fashion_marina_costa_1794793899192.jpg';
import beautyImg from '../assets/images/beauty_isabela_rocha_1794793900434.jpg';
import fitnessImg from '../assets/images/fitness_camila_mendes_1794793901463.jpg';
import realityFlowImg from '../assets/images/reality_flow_experience_1794793900908.jpg';
import digitalCoutureImg from '../assets/images/digital_couture_experience_1794793901682.jpg';
import beautyverseImg from '../assets/images/beautyverse_experience_preview_1794793903177.jpg';
import humanPerformanceImg from '../assets/images/human_performance_experience_1794793903735.jpg';

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
      'Páginas comerciais de alto padrão estruturadas para traduzir identidade, métricas reais e propostas de colaboração para marcas.',
  },
  {
    id: 'creator-pro-experience',
    number: '02',
    title: 'Creator Pro Experience',
    subtitle: 'Experiências digitais avançadas',
    description:
      'Universos interativos com direção de arte autoral, motion design e narrativa espacial sob medida para posicionamento de referência.',
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
    imageAlt: 'Prévia do projeto Lifestyle — Lívia Martins em ambiente arquitetônico iluminado',
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
      'Vitrine de posicionamento em moda autoral com foco em direção estética, editoriais e campanhas de luxo contemporâneo.',
    image: fashionImg,
    imageAlt: 'Prévia do projeto Fashion — Marina Costa em editorial minimalista de alta costura',
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
      'Estrutura comercial desenhada para conectar autoridade em skincare, perfumaria e campanhas de beleza de alto valor.',
    image: beautyImg,
    imageAlt: 'Prévia do projeto Beauty — Isabela Rocha com iluminação quente de estúdio',
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
    imageAlt: 'Prévia do projeto Fitness — Camila Mendes em cena atlética de alto contraste',
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
      'Experiência digital contínua que transforma cotidiano, curadoria e narrativa audiovisual em uma jornada interativa fluida.',
    image: realityFlowImg,
    imageAlt: 'Prévia do projeto Reality Flow com escultura espacial translúcida em luz dourada',
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
      'Passarela espacial tridimensional onde silhueta, tecido digital e editorial interativo elevam o discurso de moda.',
    image: digitalCoutureImg,
    imageAlt: 'Prévia do projeto Digital Couture com escultura têxtil metálica suspensa',
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
      'Ambiente sensorial interativo para apresentação de lançamentos, texturas e narrativas visuais no universo beauty.',
    image: beautyverseImg,
    imageAlt: 'Prévia do projeto Beautyverse com instalação óptica em vidro e âmbar',
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
      'Experiência imersiva orientada por movimento, disciplina e engenharia visual para creators de alta performance.',
    image: humanPerformanceImg,
    imageAlt: 'Prévia do projeto Human Performance com escultura biomecânica cinética',
    url: '',
  },
];
