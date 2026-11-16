import aboutStudioImg from '../assets/images/about_editorial_studio_1794793898160.jpg';

export interface SolutionItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  featured?: boolean;
}

export const STUDIO_MEDIA = {
  aboutImage: aboutStudioImg,
  aboutImageAlt:
    'Estúdio arquitetônico da Prumo Creators com iluminação direcional quente e superfícies monolíticas escuras',
};

export const SOLUTIONS: SolutionItem[] = [
  {
    id: 'creator-pro',
    index: '01',
    title: 'Creator Pro',
    subtitle: 'Páginas comerciais personalizadas para influenciadores',
    description:
      'Arquitetura comercial sob medida para organizar histórico criativo, perfil de audiência, formatos de entrega e proposta de valor em um endereço próprio.',
    deliverables: ['Direção visual autoral', 'Estrutura orientada a marcas', 'Navegação direta e responsiva'],
    featured: true,
  },
  {
    id: 'creator-pro-experience',
    index: '02',
    title: 'Creator Pro Experience',
    subtitle: 'Experiências digitais imersivas e interativas',
    description:
      'Projetos que combinam cenas tridimensionais, motion design cinematográfico e interatividade para transformar a visita de marcas em imersão memorável.',
    deliverables: ['Cenas 3D & WebGL', 'Coreografia de scroll', 'Narrativa interativa por cena'],
    featured: true,
  },
  {
    id: 'digital-identity',
    index: '03',
    title: 'Digital Identity',
    subtitle: 'Apresentação e posicionamento digital',
    description:
      'Tradução visual e estratégica do universo do creator, alinhando tipografia, linguagem gráfica e discurso comercial para elevar percepção de valor.',
    deliverables: ['Sistema visual digital', 'Tom e narrativa de marca', 'Consistência multiplataforma'],
  },
  {
    id: 'custom-experiences',
    index: '04',
    title: 'Custom Experiences',
    subtitle: 'Projetos digitais personalizados',
    description:
      'Desenvolvimento criativo de ativações proprietárias, lançamentos editoriais e plataformas especiais desenhadas a partir de objetivos específicos.',
    deliverables: ['Conceito criativo exclusivo', 'Desenvolvimento front-end avançado', 'Performance multi-dispositivo'],
  },
];

export interface ComparisonMode {
  id: 'before' | 'after';
  label: string;
  headline: string;
  summary: string;
  pillars: {
    title: string;
    detail: string;
  }[];
}

export const DIFFERENTIAL_COMPARISON: Record<'before' | 'after', ComparisonMode> = {
  before: {
    id: 'before',
    label: 'Presença Genérica',
    headline: 'Links dispersos e PDFs estáticos que diluem o valor do creator.',
    summary:
      'Quando uma marca precisa avaliar um influenciador por arquivos pesados ou agregadores genéricos, a primeira impressão perde força antes mesmo da conversa comercial.',
    pillars: [
      {
        title: 'Identidade padronizada',
        detail: 'Templates idênticos aos de milhares de perfis, sem assinatura visual própria.',
      },
      {
        title: 'Informação fragmentada',
        detail: 'Portfólio, posicionamento e formatos espalhados em múltiplos links e anexos.',
      },
      {
        title: 'Contato sem contexto',
        detail: 'Marcas chegam sem clareza sobre território criativo, entregas e diferencial.',
      },
    ],
  },
  after: {
    id: 'after',
    label: 'Experiência Prumo',
    headline: 'Um ambiente próprio que posiciona o creator como marca de alto padrão.',
    summary:
      'Cada elemento visual, textual e interativo conduz decisores e marcas por uma narrativa coesa que valoriza a autoridade do creator e acelera o contato comercial.',
    pillars: [
      {
        title: 'Direção de arte proprietária',
        detail: 'Tipografia, ritmo visual e atmosfera pensados exclusivamente para o território do creator.',
      },
      {
        title: 'Arquitetura comercial clara',
        detail: 'Projetos, editoriais e possibilidades de parceria organizados em leitura estratégica.',
      },
      {
        title: 'Conversão direta com marcas',
        detail: 'Jornada fluida que transforma interesse em conversa qualificada com poucos cliques.',
      },
    ],
  },
};

/**
 * Configuração centralizada de canais oficiais de contato.
 * Preencha os campos abaixo quando os dados comerciais oficiais forem definidos.
 * Exemplo de WhatsApp: "5511999999999" (somente dígitos com DDI e DDD).
 * Exemplo de e-mail: "contato@dominio.com".
 */
export const OFFICIAL_CONTACT_CONFIG = {
  whatsappNumber: '',
  emailAddress: '',
};
