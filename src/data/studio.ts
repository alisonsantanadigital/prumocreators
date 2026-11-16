import heroCampaignImg from '../assets/images/hero_fashion_campaign_1794799599677.jpg';
import heroInsetImg from '../assets/images/hero_detail_inset_1794799599281.jpg';
import aboutAtelierImg from '../assets/images/about_atelier_fashion_1794799600562.jpg';
import aboutStudioImg from '../assets/images/about_editorial_studio_1794799600703.jpg';
import realityFlowImg from '../assets/images/reality_flow_editorial_1794799602185.jpg';
import digitalCoutureImg from '../assets/images/digital_couture_editorial_1794799602225.jpg';
import beautyverseImg from '../assets/images/beautyverse_editorial_1794799602516.jpg';
import fashionMarinaImg from '../assets/images/fashion_marina_costa_1794799601160.jpg';

export interface SolutionItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
}

export const STUDIO_MEDIA = {
  heroCampaign: heroCampaignImg,
  heroCampaignAlt:
    'Campanha editorial de moda contemporânea em galeria brutalista iluminada com alfaiataria escultural em preto e cinza quente',
  heroInset: heroInsetImg,
  heroInsetAlt:
    'Detalhe editorial em close de lapela de casaco em lã preta e manga escultural em seda contra travertino',
  aboutAtelier: aboutAtelierImg,
  aboutAtelierAlt:
    'Ateliê de direção criativa em luz natural com mesa de carvalho, provas editoriais e amostras têxteis',
  aboutDetail: aboutStudioImg,
  aboutDetailAlt:
    'Recorte arquitetônico do estúdio com blocos de pedra travertino e iluminação direcional',
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
    image: fashionMarinaImg,
    imageAlt: 'Fotografia editorial de moda representando a solução Creator Pro',
  },
  {
    id: 'creator-pro-experience',
    index: '02',
    title: 'Creator Pro Experience',
    subtitle: 'Experiências digitais imersivas e interativas',
    description:
      'Projetos que combinam fotografia em grande escala, direção editorial cinematográfica e interatividade refinada para transformar a visita de marcas em imersão.',
    deliverables: ['Direção de arte autoral', 'Coreografia de scroll', 'Narrativa interativa por cena'],
    image: digitalCoutureImg,
    imageAlt: 'Fotografia de alta costura escultural representando Creator Pro Experience',
  },
  {
    id: 'digital-identity',
    index: '03',
    title: 'Digital Identity',
    subtitle: 'Apresentação e posicionamento digital',
    description:
      'Tradução visual e estratégica do universo do creator, alinhando tipografia, linguagem gráfica e discurso comercial para elevar percepção de valor.',
    deliverables: ['Sistema visual digital', 'Tom e narrativa de marca', 'Consistência editorial'],
    image: beautyverseImg,
    imageAlt: 'Retrato editorial minimalista representando Digital Identity',
  },
  {
    id: 'custom-experiences',
    index: '04',
    title: 'Custom Experiences',
    subtitle: 'Projetos digitais personalizados',
    description:
      'Desenvolvimento criativo de ativações proprietárias, lançamentos editoriais e plataformas especiais desenhadas a partir de objetivos específicos.',
    deliverables: ['Conceito criativo exclusivo', 'Desenvolvimento front-end autoral', 'Performance multi-dispositivo'],
    image: realityFlowImg,
    imageAlt: 'Fotografia editorial contemporânea representando Custom Experiences',
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
