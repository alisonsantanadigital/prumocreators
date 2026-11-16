import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Mail, MessageSquare } from 'lucide-react';
import { OFFICIAL_CONTACT_CONFIG, PRACTICE_AREAS } from '../data/studio';
import { MagneticButton, StaggeredText } from './motion/MotionPrimitives';

export function ContactSection() {
  const [name, setName] = useState('');
  const [channel, setChannel] = useState('');
  const [interest, setInterest] = useState(PRACTICE_AREAS[0].title);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const hasWhatsapp = Boolean(OFFICIAL_CONTACT_CONFIG.whatsappNumber.trim());
  const hasEmail = Boolean(OFFICIAL_CONTACT_CONFIG.emailAddress.trim());

  const whatsappHref = hasWhatsapp
    ? `https://wa.me/${OFFICIAL_CONTACT_CONFIG.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
        `Olá PRUMO CREATORS${name ? `, sou ${name}` : ''}. Gostaria de conversar sobre ${interest}.${
          message ? ` ${message}` : ''
        }`,
      )}`
    : undefined;

  const emailHref = hasEmail
    ? `mailto:${OFFICIAL_CONTACT_CONFIG.emailAddress.trim()}?subject=${encodeURIComponent(
        `Contato PRUMO CREATORS — ${interest}`,
      )}&body=${encodeURIComponent(`${name ? `Nome: ${name}\n` : ''}${channel ? `Perfil/Canal: ${channel}\n` : ''}\n${message}`)}`
    : undefined;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setChannel('');
    setMessage('');
  };

  return (
    <section
      id="contato"
      className="relative py-28 sm:py-36 lg:py-44 bg-[#111111] text-[#F2F0EB]"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          {/* Left: Editorial Invitation & Direct Channels */}
          <div className="lg:col-span-6">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#A58A58] mb-6">
              07 — Contato
            </p>

            <h2 className="font-serif text-[clamp(2.4rem,4.5vw,4.25rem)] font-normal leading-[1.03] tracking-[-0.025em] text-[#F2F0EB] [text-wrap:balance]">
              <StaggeredText
                stagger={0.045}
                segments={[
                  { text: 'Vamos construir sua ' },
                  { text: 'próxima presença digital?', italic: true },
                ]}
              />
            </h2>

            <p className="mt-6 text-base sm:text-xl leading-relaxed text-[#A7A49E] max-w-lg">
              Seu trabalho merece uma apresentação profissional.
            </p>

            {/* WhatsApp & E-mail Channel Blocks (Centralized Config) */}
            <div className="mt-14 pt-10 border-t border-white/12 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.16em] uppercase text-[#A58A58] mb-3">
                  <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>WhatsApp</span>
                </div>
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#F2F0EB] border-b border-[#A58A58] pb-1 hover:text-[#A58A58] transition-colors"
                  >
                    <span>Conversar pelo WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                ) : (
                  <p className="text-xs leading-relaxed text-[#A7A49E]">
                    Canal direto preparado para receber o número oficial na configuração do estúdio.
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.16em] uppercase text-[#A58A58] mb-3">
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>E-mail</span>
                </div>
                {emailHref ? (
                  <a
                    href={emailHref}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#F2F0EB] border-b border-[#A58A58] pb-1 hover:text-[#A58A58] transition-colors"
                  >
                    <span className="truncate">{OFFICIAL_CONTACT_CONFIG.emailAddress}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                ) : (
                  <p className="text-xs leading-relaxed text-[#A7A49E]">
                    Endereço preparado para receber o e-mail comercial oficial na configuração.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right: Elegant Functional Contact Form */}
          <div className="lg:col-span-6">
            <div className="border border-white/15 p-7 sm:p-10 bg-[#151515]">
              {submitted ? (
                <div className="py-10">
                  <div className="inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.18em] uppercase text-[#A58A58]">
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Solicitação preparada</span>
                  </div>
                  <h3 className="mt-4 font-serif text-3xl font-normal text-[#F2F0EB]">
                    Obrigado, <span className="italic">{name}</span>.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#A7A49E]">
                    Seus dados iniciais para <span className="text-[#F2F0EB]">{interest}</span> foram
                    organizados.
                    {hasWhatsapp || hasEmail
                      ? ' Utilize um dos canais diretos ao lado ou abaixo para concluir o envio.'
                      : ' Assim que os canais comerciais oficiais forem preenchidos na configuração, o envio direto por WhatsApp ou e-mail ficará ativo.'}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    {whatsappHref && (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#111111] bg-[#F2F0EB] hover:bg-[#A58A58] transition-colors"
                      >
                        <span>Enviar pelo WhatsApp</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {emailHref && (
                      <a
                        href={emailHref}
                        className="inline-flex items-center gap-2 px-5 py-3 text-[11px] font-medium tracking-[0.14em] uppercase text-[#F2F0EB] border border-white/25 hover:border-[#A58A58] transition-colors"
                      >
                        <span>Enviar por E-mail</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#A7A49E] hover:text-[#F2F0EB] transition-colors cursor-pointer"
                    >
                      Novo preenchimento
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="pb-4 border-b border-white/10">
                    <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#A58A58]">
                      Iniciar Conversa
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#A7A49E] mb-2"
                      >
                        Nome
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome ou marca"
                        className="w-full px-0 py-2.5 text-sm bg-transparent border-b border-white/20 text-[#F2F0EB] placeholder:text-[#5C5A55] focus:outline-none focus:border-[#A58A58] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-channel"
                        className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#A7A49E] mb-2"
                      >
                        Perfil ou Rede Principal
                      </label>
                      <input
                        id="contact-channel"
                        type="text"
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                        placeholder="@seuusuario"
                        className="w-full px-0 py-2.5 text-sm bg-transparent border-b border-white/20 text-[#F2F0EB] placeholder:text-[#5C5A55] focus:outline-none focus:border-[#A58A58] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#A7A49E] mb-3">
                      Área de Interesse
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {PRACTICE_AREAS.map((area) => (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => setInterest(area.title)}
                          className={`px-4 py-3 text-left text-[11px] font-medium tracking-[0.08em] uppercase border transition-colors cursor-pointer ${
                            interest === area.title
                              ? 'border-[#A58A58] bg-[#A58A58]/15 text-[#F2F0EB]'
                              : 'border-white/12 text-[#A7A49E] hover:border-white/30 hover:text-[#F2F0EB]'
                          }`}
                        >
                          {area.index} · {area.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#A7A49E] mb-2"
                    >
                      Sobre o Projeto
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Descreva brevemente seu momento e o que busca construir"
                      className="w-full px-0 py-2.5 text-sm bg-transparent border-b border-white/20 text-[#F2F0EB] placeholder:text-[#5C5A55] focus:outline-none focus:border-[#A58A58] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <MagneticButton>
                      <button
                        type="submit"
                        className="prumo-cta-glow inline-flex items-center gap-2.5 px-7 py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#111111] bg-[#F2F0EB] hover:bg-[#A58A58] transition-colors duration-150 cursor-pointer"
                      >
                        <span>Enviar Solicitação</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </MagneticButton>

                    {whatsappHref && (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#A58A58] hover:text-[#F2F0EB] transition-colors"
                      >
                        Falar via WhatsApp
                      </a>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
