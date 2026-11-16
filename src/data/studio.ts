import heroCampaignImg from '../assets/images/hero_fashion_campaign_1794799599677.jpg';
import heroInsetImg from '../assets/images/hero_detail_inset_1794799599281.jpg';
import aboutAtelierImg from '../assets/images/about_atelier_fashion_1794799600562.jpg';
import aboutStudioImg from '../assets/images/about_editorial_studio_1794799600703.jpg';
import visionSpreadImg from '../assets/images/vision_editorial_spread_1794800182540.jpg';
import fashionMarinaImg from '../assets/images/fashion_marina_costa_1794799601160.jpg';
import digitalCoutureImg from '../assets/images/digital_couture_editorial_1794799602225.jpg';
import beautyverseImg from '../assets/images/beautyverse_editorial_1794799602516.jpg';
import realityFlowImg from '../assets/images/reality_flow_editorial_1794799602185.jpg';

export interface PracticeArea {
  id: string;
  index: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export interface PartnerBrand {
  id: string;
  name: string;
  logoSrc: string;
  url?: string;
}

export const STUDIO_MEDIA = {
  heroCampaign: heroCampaignImg,
  heroCampaignAlt:
    'Campanha editorial de moda em galeria arquitetônica brutalista com alfaiataria em preto e cinza mineral',
  /**
   * Vídeo curto, real e sem som para reprodução contínua na abertura (Hero).
   * Preencher somente com arquivo ou URL real e autorizado.
   */
  heroVideo: '' as string,
  heroInset: heroInsetImg,
  heroInsetAlt:
    'Detalhe editorial de alfaiataria em lã preta contra parede em pedra travertino',
  manifestoAtelier: aboutAtelierImg,
  manifestoAtelierAlt:
    'Ateliê criativo em luz natural com provas editoriais e tecidos sobre mesa de carvalho',
  studioDetail: aboutStudioImg,
  studioDetailAlt:
    'Estúdio de direção criativa com volumes em travertino e luz natural direcional',
  visionSpread: visionSpreadImg,
  visionSpreadAlt:
    'Corredor arquitetônico em pedra clara com sombras geométricas e silhueta editorial ao centro',
};

/**
 * Marcas reais e autorizadas para a faixa contínua (Infinite Marquee).
 * Mantenha vazio até que os logotipos oficiais estejam autorizados.
 */
export const PARTNER_BRANDS: PartnerBrand[] = [];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'creator-pro',
    index: '01',
    title: 'CREATOR PRO',
    description: 'Apresentações digitais profissionais para influenciadores.',
    image: fashionMarinaImg,
    imageAlt: 'Retrato editorial de moda representando Creator Pro',
  },
  {
    id: 'creator-pro-experience',
    index: '02',
    title: 'CREATOR PRO EXPERIENCE',
    description:
      'Experiências digitais personalizadas, com direção de arte e identidade própria.',
    image: digitalCoutureImg,
    imageAlt: 'Composição de alta costura minimalista representando Creator Pro Experience',
  },
  {
    id: 'digital-identity',
    index: '03',
    title: 'DIGITAL IDENTITY',
    description: 'Desenvolvimento de posicionamento e identidade digital.',
    image: beautyverseImg,
    imageAlt: 'Fotografia editorial minimalista representando Digital Identity',
  },
  {
    id: 'custom-experiences',
    index: '04',
    title: 'CUSTOM EXPERIENCES',
    description: 'Projetos digitais personalizados para talentos e marcas.',
    image: realityFlowImg,
    imageAlt: 'Cena editorial contemporânea representando Custom Experiences',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'IDENTIDADE',
    description: 'Entendemos o universo, a personalidade e o posicionamento do creator.',
  },
  {
    index: '02',
    title: 'CONSTRUÇÃO',
    description:
      'Desenvolvemos uma experiência digital alinhada à sua identidade e aos seus objetivos comerciais.',
  },
  {
    index: '03',
    title: 'APRESENTAÇÃO',
    description:
      'Entregamos uma presença digital profissional, preparada para apresentar oportunidades a marcas.',
  },
];

/**
 * Configuração centralizada de canais de contato da Prumo Creators.
 * Preencha os campos abaixo quando os dados oficiais estiverem definidos.
 * Exemplo de WhatsApp: "5511999999999" (apenas dígitos, com DDI e DDD).
 * Exemplo de e-mail: "contato@dominio.com".
 */
export const OFFICIAL_CONTACT_CONFIG = {
  whatsappNumber: '',
  emailAddress: '',
};
