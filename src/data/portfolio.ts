import lifestyleHeroShot from '../assets/screenshots/lifestyle.png';
import fashionHeroShot from '../assets/screenshots/fashion.png';
import beautyHeroShot from '../assets/screenshots/beauty.png';
import fitnessHeroShot from '../assets/screenshots/fitness.png';
import realityFlowHeroShot from '../assets/screenshots/reality-flow.png';

export type CollectionId = 'creator-pro' | 'creator-pro-experience';

export interface PortfolioProject {
  id: string;
  globalNumber: string;
  indexInCollection: string;
  collection: CollectionId;
  collectionLabel: string;
  name: string;
  category: string;
  visualConcept: string;
  /**
   * Print real da Hero Section (primeira dobra) do site correspondente.
   * Mantenha null quando o projeto ainda não tiver captura disponível.
   */
  heroScreenshot: string | null;
  screenshotAlt: string;
  /**
   * Prévia de vídeo real para exibição no hover sobre o projeto.
   * Mantenha null quando não houver vídeo real disponível.
   */
  previewVideo?: string | null;
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
    subtitle: 'Apresentações comerciais para criadores de conteúdo',
  },
  {
    id: 'creator-pro-experience',
    number: '02',
    title: 'Creator Pro Experience',
    subtitle: 'Experiências digitais imersivas com direção de arte autoral',
  },
];

/**
 * Configuração centralizada dos oito projetos do portfólio Prumo Creators.
 * - `heroScreenshot`: captura real da primeira dobra (Hero) do site publicado.
 * - `url`: endereço publicado que será aberto em nova aba pelo botão "Explorar projeto".
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  // COLEÇÃO 01 — CREATOR PRO
  {
    id: 'creator-pro-lifestyle',
    globalNumber: '01',
    indexInCollection: '01',
    collection: 'creator-pro',
    collectionLabel: 'Creator Pro',
    name: 'Lifestyle — Lívia Martins',
    category: 'Lifestyle',
    visualConcept:
      'Editorial luminoso em tons de marfim e linho, equilibrando proximidade natural e sofisticação comercial.',
    heroScreenshot: lifestyleHeroShot,
    screenshotAlt: 'Print real da Hero Section do projeto Lifestyle — Lívia Martins',
    url: 'https://creator-pro-lifestyle.vercel.app/',
  },
  {
    id: 'creator-pro-fashion',
    globalNumber: '02',
    indexInCollection: '02',
    collection: 'creator-pro',
    collectionLabel: 'Creator Pro',
    name: 'Fashion — Marina Costa',
    category: 'Fashion',
    visualConcept:
      'Contraste editorial minimalista em concreto e alfaiataria escura para posicionamento de moda contemporânea.',
    heroScreenshot: fashionHeroShot,
    screenshotAlt: 'Print real da Hero Section do projeto Fashion — Marina Costa',
    url: 'https://creator-pro-fashion.vercel.app/',
  },
  {
    id: 'creator-pro-beauty',
    globalNumber: '03',
    indexInCollection: '03',
    collection: 'creator-pro',
    collectionLabel: 'Creator Pro',
    name: 'Beauty — Isabela Rocha',
    category: 'Beauty',
    visualConcept:
      'Composição clara e delicada com tipografia serifada e foco em autoridade estética para beleza e skincare.',
    heroScreenshot: beautyHeroShot,
    screenshotAlt: 'Print real da Hero Section do projeto Beauty — Isabela Rocha',
    url: 'https://creator-pro-beauty.vercel.app/',
  },
  {
    id: 'creator-pro-fitness',
    globalNumber: '04',
    indexInCollection: '04',
    collection: 'creator-pro',
    collectionLabel: 'Creator Pro',
    name: 'Fitness — Camila Mendes',
    category: 'Fitness',
    visualConcept:
      'Direção escura de alto impacto com acento oliva e estrutura orientada à performance e bem-estar.',
    heroScreenshot: fitnessHeroShot,
    screenshotAlt: 'Print real da Hero Section do projeto Fitness — Camila Mendes',
    url: 'https://creator-pro-fitness.vercel.app/',
  },

  // COLEÇÃO 02 — CREATOR PRO EXPERIENCE
  {
    id: 'experience-reality-flow',
    globalNumber: '05',
    indexInCollection: '01',
    collection: 'creator-pro-experience',
    collectionLabel: 'Creator Pro Experience',
    name: 'Lifestyle — Reality Flow',
    category: 'Lifestyle',
    visualConcept:
      'Experiência cinematográfica em tela cheia com atmosfera arquitetônica e narrativa sensorial contínua.',
    heroScreenshot: realityFlowHeroShot,
    screenshotAlt: 'Print real da Hero Section do projeto Lifestyle — Reality Flow',
    url: 'https://prumo-creators-creator-pro-experien.vercel.app/',
  },
  {
    id: 'experience-digital-couture',
    globalNumber: '06',
    indexInCollection: '02',
    collection: 'creator-pro-experience',
    collectionLabel: 'Creator Pro Experience',
    name: 'Fashion — Digital Couture',
    category: 'Fashion',
    visualConcept:
      'Passarela digital autoral desenhada para destacar silhueta, movimento têxtil e direção de moda.',
    heroScreenshot: null,
    screenshotAlt: 'Área preparada para captura real da Hero Section de Fashion — Digital Couture',
    url: '',
  },
  {
    id: 'experience-beautyverse',
    globalNumber: '07',
    indexInCollection: '03',
    collection: 'creator-pro-experience',
    collectionLabel: 'Creator Pro Experience',
    name: 'Beauty — Beautyverse',
    category: 'Beauty',
    visualConcept:
      'Narrativa imersiva focada em luz, textura e presença sensorial para lançamentos de beleza.',
    heroScreenshot: null,
    screenshotAlt: 'Área preparada para captura real da Hero Section de Beauty — Beautyverse',
    url: '',
  },
  {
    id: 'experience-human-performance',
    globalNumber: '08',
    indexInCollection: '04',
    collection: 'creator-pro-experience',
    collectionLabel: 'Creator Pro Experience',
    name: 'Fitness — Human Performance',
    category: 'Fitness',
    visualConcept:
      'Experiência interativa orientada por ritmo atlético, disciplina e estética esportiva contemporânea.',
    heroScreenshot: null,
    screenshotAlt:
      'Área preparada para captura real da Hero Section de Fitness — Human Performance',
    url: '',
  },
];
