import heroCampaignImg from '../assets/images/brazil_hero_studio_1794805121857.jpg';
import aboutAtelierImg from '../assets/images/brazil_manifesto_atelier_1794805123072.jpg';
import visionSpreadImg from '../assets/images/brazil_vision_horizon_1794805125799.jpg';
import practiceCreatorProImg from '../assets/images/brazil_practice_creator_pro_1794805123507.jpg';
import practiceCreatorExperienceImg from '../assets/images/brazil_practice_creator_experience_1794805124298.jpg';
import practiceDigitalIdentityImg from '../assets/images/brazil_practice_digital_identity_1794805124677.jpg';
import practiceCustomExperiencesImg from '../assets/images/brazil_practice_custom_experiences_1794805125846.jpg';

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
    'Estúdio de arquitetura modernista brasileira vazio em São Paulo ao entardecer, com concreto aparente escuro, câmera de cinema em tripé, palmeiras e horizonte dourado',
  /**
   * Vídeo curto, real e sem som para reprodução contínua na abertura (Hero).
   * Preencher somente com arquivo ou URL real e autorizado.
   */
  heroVideo: '' as string,
  manifestoAtelier: aboutAtelierImg,
  manifestoAtelierAlt:
    'Ateliê de arquitetura modernista brasileira sem pessoas, com mesa em jacarandá, câmera, papéis artesanais, cobogós e folhagem de costela-de-adão sob luz natural',
  visionSpread: visionSpreadImg,
  visionSpreadAlt:
    'Terraço modernista brasileiro vazio em concreto e travertino com espelho d’água voltado para as montanhas e baía do Rio de Janeiro ao pôr do sol',
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
    image: practiceCreatorProImg,
    imageAlt:
      'Sala de estúdio brasileira vazia em luz natural com poltrona em freijó e couro, microfone de estúdio e lente de cinema sobre bloco de travertino diante de cobogós',
  },
  {
    id: 'creator-pro-experience',
    index: '02',
    title: 'CREATOR PRO EXPERIENCE',
    description:
      'Experiências digitais personalizadas, com direção de arte e identidade própria.',
    image: practiceCreatorExperienceImg,
    imageAlt:
      'Set de produção vazio em pavilhão curvo de arquitetura modernista brasileira em concreto branco e travertino, com câmera de cinema e monitor de referência',
  },
  {
    id: 'digital-identity',
    index: '03',
    title: 'DIGITAL IDENTITY',
    description: 'Desenvolvimento de posicionamento e identidade digital.',
    image: practiceDigitalIdentityImg,
    imageAlt:
      'Mesa de direção em travertino e madeira freijó sob sombras de cobogós com papéis de algodão, amostras minerais, tablet com grade geométrica e xícara de cafezinho',
  },
  {
    id: 'custom-experiences',
    index: '04',
    title: 'CUSTOM EXPERIENCES',
    description: 'Projetos digitais personalizados para talentos e marcas.',
    image: practiceCustomExperiencesImg,
    imageAlt:
      'Pavilhão contemporâneo brasileiro vazio com forro de madeira ripada, mesa monolítica de travertino, espelho d’água e jardim tropical nativo',
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
