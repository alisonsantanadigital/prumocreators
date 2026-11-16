import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Mail, MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OFFICIAL_CONTACT_CONFIG, SOLUTIONS, STUDIO_MEDIA } from '../data/studio';

export function ContactSection() {
  const [panelMode, setPanelMode] = useState<'none' | 'brief' | 'channels'>('none');
  const [creatorName, setCreatorName] = useState('');
  const [selectedSolution, setSelectedSolution] = useState(SOLUTIONS[0].title);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const hasWhatsapp = Boolean(OFFICIAL_CONTACT_CONFIG.whatsappNumber.trim());
  const hasEmail = Boolean(OFFICIAL_CONTACT_CONFIG.emailAddress.trim());

  const whatsappHref = hasWhatsapp
    ? `https://wa.me/${OFFICIAL_CONTACT_CONFIG.whatsappNumber.replace(/\D/g, '')}`
    : undefined;
  const emailHref = hasEmail ? `mailto:${OFFICIAL_CONTACT_CONFIG.emailAddress.trim()}` : undefined;

  const handleBriefSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!creatorName.trim()) return;
    setSubmitted(true);
  };

  const resetBrief = () => {
    setSubmitted(false);
    setCreatorName('');
    setNotes('');
  };

  return (
    <section
      id="contato"
      className="relative py-24 sm:py-32 lg:py-40 bg-[#0A0A0A] text-[#F6F4EE] border-t border-white/10 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: High-Impact Editorial Conversion Copy */}
          <div className="lg:col-span-8">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#9A968E] mb-5">
              05 · Contato e Conversão
            </p>

            <h2 className="font-serif text-[clamp(2.35rem,4.8vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#F6F4EE] [text-wrap:balance]">
              SEU PRÓXIMO NÍVEL COMEÇA COM UMA{' '}
              <span className="italic font-normal">NOVA APRESENTAÇÃO.</span>
            </h2>

            <p className="mt-7 max-w-xl text-base sm:text-xl leading-relaxed text-[#D6D2C9]">
              Vamos transformar sua presença digital em uma experiência que represente o valor da
              sua marca pessoal.
            </p>

            {/* Primary & Secondary Conversion Actions */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setPanelMode((prev) => (prev === 'brief' ? 'none' : 'brief'));
                }}
                className="inline-flex items-center gap-2.5 px-7 py-4 text-xs font-semibold tracking-[0.14em] uppercase text-[#0A0A0A] bg-[#F6F4EE] hover:bg-[#8C261A] hover:text-[#F6F4EE] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6F4EE]"
              >
                QUERO MINHA EXPERIÊNCIA
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setPanelMode((prev) => (prev === 'channels' ? 'none' : 'channels'))}
                className="inline-flex items-center gap-2.5 px-7 py-4 text-xs font-medium tracking-[0.14em] uppercase text-[#F6F4EE] border border-white/25 hover:border-[#F6F4EE] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6F4EE]"
              >
                FALAR COM A PRUMO
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right: Editorial Campaign Portrait Frame */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-[#141414] p-2.5 border border-white/15">
              <div className="aspect-[3/4] overflow-hidden bg-[#1B1B1B]">
                {!imgError ? (
                  <img
                    src={STUDIO_MEDIA.aboutAtelier}
                    alt={STUDIO_MEDIA.aboutAtelierAlt}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1C1C1C]" />
                )}
              </div>
              <div className="pt-2.5 px-0.5 flex items-center justify-between text-[11px] tracking-[0.12em] uppercase text-[#9A968E]">
                <span>Atendimento Comercial</span>
                <span>Prumo Creators</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Conversion Panels */}
        <AnimatePresence mode="wait">
          {panelMode === 'brief' && (
            <motion.div
              key="brief-panel"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 max-w-3xl bg-[#121212] border border-white/15 p-7 sm:p-10"
            >
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-[#F6F4EE]">
                    Estruturar Novo Projeto
                  </h3>
                  <p className="mt-1 text-xs text-[#9A968E]">
                    Organize os detalhes iniciais da sua apresentação ou experiência digital.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPanelMode('none')}
                  aria-label="Fechar formulário"
                  className="w-10 h-10 inline-flex items-center justify-center text-[#9A968E] hover:text-[#F6F4EE] border border-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {submitted ? (
                <div className="py-8">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-[#F6F4EE]">
                    <Check className="w-4 h-4 text-[#8C261A]" aria-hidden="true" />
                    <span>Direcionamento registrado</span>
                  </div>
                  <p className="mt-3 font-serif text-2xl text-[#F6F4EE]">
                    Resumo preparado para <span className="italic">{creatorName}</span> em{' '}
                    {selectedSolution}.
                  </p>
                  <p className="mt-2 text-sm text-[#B5B0A6]">
                    {hasWhatsapp || hasEmail
                      ? 'Selecione um dos canais oficiais abaixo para enviar seu resumo.'
                      : 'Os canais oficiais de WhatsApp e e-mail estão preparados para receber os dados comerciais.'}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {whatsappHref && (
                      <a
                        href={`${whatsappHref}?text=${encodeURIComponent(
                          `Olá Prumo Creators, sou ${creatorName} e tenho interesse em ${selectedSolution}. ${notes}`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.1em] uppercase text-[#0A0A0A] bg-[#F6F4EE] hover:bg-[#8C261A] hover:text-[#F6F4EE]"
                      >
                        Enviar via WhatsApp
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {emailHref && (
                      <a
                        href={`${emailHref}?subject=${encodeURIComponent(
                          `Projeto ${selectedSolution} — ${creatorName}`,
                        )}&body=${encodeURIComponent(notes)}`}
                        className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.1em] uppercase text-[#F6F4EE] border border-white/25 hover:border-[#F6F4EE]"
                      >
                        Enviar por E-mail
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={resetBrief}
                      className="px-4 py-3 text-xs font-medium tracking-[0.08em] uppercase text-[#9A968E] hover:text-[#F6F4EE] cursor-pointer"
                    >
                      Preparar outro resumo
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBriefSubmit} className="mt-6 space-y-5">
                  <div>
                    <label
                      htmlFor="creator-name"
                      className="block text-xs font-medium tracking-[0.08em] uppercase text-[#D6D2C9] mb-2"
                    >
                      Nome do Creator ou Marca
                    </label>
                    <input
                      id="creator-name"
                      type="text"
                      required
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      placeholder="Ex.: Nome artístico ou projeto"
                      className="w-full px-4 py-3 text-sm bg-[#0A0A0A] border border-white/15 text-[#F6F4EE] placeholder:text-[#6B6860] focus:outline-none focus:border-[#F6F4EE]"
                    />
                  </div>

                  <div>
                    <span className="block text-xs font-medium tracking-[0.08em] uppercase text-[#D6D2C9] mb-2">
                      Solução de interesse
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SOLUTIONS.map((sol) => (
                        <button
                          key={sol.id}
                          type="button"
                          onClick={() => setSelectedSolution(sol.title)}
                          className={`px-4 py-3 text-left text-xs font-medium border transition-colors cursor-pointer ${
                            selectedSolution === sol.title
                              ? 'bg-[#F6F4EE] border-[#F6F4EE] text-[#0A0A0A]'
                              : 'bg-[#0A0A0A] border-white/15 text-[#B5B0A6] hover:text-[#F6F4EE]'
                          }`}
                        >
                          {sol.index}. {sol.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="creator-notes"
                      className="block text-xs font-medium tracking-[0.08em] uppercase text-[#D6D2C9] mb-2"
                    >
                      Objetivo da apresentação (opcional)
                    </label>
                    <textarea
                      id="creator-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Conte brevemente seu segmento e o momento atual do projeto"
                      className="w-full px-4 py-3 text-sm bg-[#0A0A0A] border border-white/15 text-[#F6F4EE] placeholder:text-[#6B6860] focus:outline-none focus:border-[#F6F4EE]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 text-xs font-semibold tracking-[0.12em] uppercase text-[#0A0A0A] bg-[#F6F4EE] hover:bg-[#8C261A] hover:text-[#F6F4EE] transition-colors cursor-pointer"
                    >
                      Confirmar Direcionamento
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {panelMode === 'channels' && (
            <motion.div
              key="channels-panel"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 max-w-3xl bg-[#121212] border border-white/15 p-7 sm:p-10"
            >
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-[#F6F4EE]">
                    Canais Comerciais Prumo Creators
                  </h3>
                  <p className="mt-1 text-xs text-[#9A968E]">
                    Estrutura preparada para atendimento oficial via WhatsApp e E-mail.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPanelMode('none')}
                  aria-label="Fechar canais"
                  className="w-10 h-10 inline-flex items-center justify-center text-[#9A968E] hover:text-[#F6F4EE] border border-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-[#0A0A0A] border border-white/10 flex flex-col justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-[#F6F4EE]" aria-hidden="true" />
                    <span className="text-xs font-semibold tracking-[0.1em] uppercase text-[#F6F4EE]">
                      WhatsApp Oficial
                    </span>
                  </div>
                  {whatsappHref ? (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold tracking-[0.1em] uppercase text-[#0A0A0A] bg-[#F6F4EE] hover:bg-[#8C261A] hover:text-[#F6F4EE]"
                    >
                      <span>Iniciar conversa</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <p className="text-xs leading-relaxed text-[#9A968E]">
                      Canal preparado para receber o número comercial oficial da Prumo Creators.
                    </p>
                  )}
                </div>

                <div className="p-5 bg-[#0A0A0A] border border-white/10 flex flex-col justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#F6F4EE]" aria-hidden="true" />
                    <span className="text-xs font-semibold tracking-[0.1em] uppercase text-[#F6F4EE]">
                      E-mail Comercial
                    </span>
                  </div>
                  {emailHref ? (
                    <a
                      href={emailHref}
                      className="inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-[#F6F4EE] border border-white/25 hover:border-[#F6F4EE]"
                    >
                      <span className="truncate">{OFFICIAL_CONTACT_CONFIG.emailAddress}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  ) : (
                    <p className="text-xs leading-relaxed text-[#9A968E]">
                      Canal preparado para receber o endereço de e-mail oficial da agência.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
