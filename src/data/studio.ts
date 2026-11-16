import heroCampaignImg from '../assets/images/brazil_simple_hero_phone_1794805787447.jpg';
import aboutAtelierImg from '../assets/images/brazil_simple_desk_clean_1794805810191.jpg';
import visionSpreadImg from '../assets/images/brazil_simple_horizon_phone_1794805789596.jpg';

export interface ProjectTypeOption {
  id: string;
  index: string;
  title: string;
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
    'Mesa simples de trabalho no Brasil com celular em tripé compacto e xícara de café ao lado de janela com prédios ao fundo, sem pessoas',
  /**
   * Vídeo curto, real e sem som para reprodução contínua na abertura (Hero).
   * Preencher somente com arquivo ou URL real e autorizado.
   */
  heroVideo: '' as string,
  manifestoAtelier: aboutAtelierImg,
  manifestoAtelierAlt:
    'Mesa de madeira simples em apartamento brasileiro iluminado por luz natural, com smartphone, caderno aberto, caneta, planta e xícara de café, sem pessoas',
  visionSpread: visionSpreadImg,
  visionSpreadAlt:
    'Mesa em varanda brasileira simples com smartphone e xícara de café voltada para a paisagem urbana ao pôr do sol, sem pessoas',
};

export const FOUNDER_PROFILE = {
  photo: '/assets/aistudio/Gemini_Generated_Image_ru5r43ru5r43ru5r_55c09408.jpg',
  photoAlt: "Foto de Alison Sant'Ana, fundador da Prumo Creators",
  eyebrow: '05 — Fundador',
  name: "Alison Sant'Ana",
  subtitle: 'Trabalho direto ao lado de quem cria.',
  role: "Alison Sant'Ana · Fundador, Prumo Creators",
  bio: 'À frente da Prumo Creators, trabalho diretamente com influenciadores e criadores para transformar sua rotina nas redes em páginas profissionais e apresentações prontas para marcas e parceiros. O foco é direto: visual limpo, mensagem objetiva e projetos reais feitos para abrir portas.',
};

/**
 * Marcas reais e autorizadas para a faixa contínua (Infinite Marquee).
 * Mantenha vazio até que os logotipos oficiais estejam autorizados.
 */
export const PARTNER_BRANDS: PartnerBrand[] = [];

export const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'creator-pro',
    index: '01',
    title: 'CREATOR PRO',
  },
  {
    id: 'creator-pro-experience',
    index: '02',
    title: 'CREATOR PRO EXPERIENCE',
  },
  {
    id: 'apresentacao-comercial',
    index: '03',
    title: 'APRESENTAÇÃO COMERCIAL',
  },
  {
    id: 'projeto-sob-medida',
    index: '04',
    title: 'PROJETO SOB MEDIDA',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'ALINHAMENTO',
    description:
      'Entendemos seu nicho, seu público e o que marcas e parceiros precisam enxergar logo no primeiro acesso.',
  },
  {
    index: '02',
    title: 'CRIAÇÃO',
    description:
      'Estruturamos sua página e apresentação comercial com visual profissional, direto ao ponto e fiel ao seu estilo.',
  },
  {
    index: '03',
    title: 'PUBLICAÇÃO',
    description:
      'Entregamos o projeto no ar, pronto para compartilhar na bio, enviar em propostas e fechar novos trabalhos.',
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
