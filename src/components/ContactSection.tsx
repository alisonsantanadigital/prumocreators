import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Mail, MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OFFICIAL_CONTACT_CONFIG, SOLUTIONS } from '../data/studio';

export function ContactSection() {
  const [panelMode, setPanelMode] = useState<'none' | 'brief' | 'channels'>('none');
  const [creatorName, setCreatorName] = useState('');
  const [selectedSolution, setSelectedSolution] = useState(SOLUTIONS[0].title);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
      className="relative py-24 sm:py-36 bg-[#070709] border-t border-white/[0.08] overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <p className="text-xs font-medium tracking-[0.14em] text-[#D4A853] mb-5">
            05. Contato e Conversão
          </p>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-bold leading-[1.04] tracking-[-0.03em] text-[#F5F4F0] [text-wrap:balance]">
            SEU PRÓXIMO NÍVEL COMEÇA COM UMA NOVA APRESENTAÇÃO.
          </h2>
          <p className="mt-6 max-w-2xl text-base sm:text-xl leading-relaxed text-[#D4D4D8]">
            Vamos transformar sua presença digital em uma experiência que represente o valor da
            sua marca pessoal.
          </p>

          {/* Primary & Secondary Conversion CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setPanelMode((prev) => (prev === 'brief' ? 'none' : 'brief'));
              }}
              className="inline-flex items-center gap-2.5 px-7 py-4 text-sm font-semibold tracking-wide text-[#070709] bg-[#D4A853] hover:bg-[#E5BE67] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F4F0]"
            >
              QUERO MINHA EXPERIÊNCIA
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setPanelMode((prev) => (prev === 'channels' ? 'none' : 'channels'))}
              className="inline-flex items-center gap-2.5 px-7 py-4 text-sm font-medium tracking-wide text-[#F5F4F0] border border-white/20 hover:border-[#D4A853] hover:text-[#D4A853] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A853]"
            >
              FALAR COM A PRUMO
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Interactive Conversion Panels */}
        <AnimatePresence mode="wait">
          {panelMode === 'brief' && (
            <motion.div
              key="brief-panel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 max-w-3xl bg-[#0E0E13] border border-white/[0.12] p-7 sm:p-10"
            >
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#F5F4F0]">
                    Estruturar Novo Projeto
                  </h3>
                  <p className="mt-1 text-xs text-[#A1A1AA]">
                    Organize os detalhes iniciais da sua apresentação ou experiência digital.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPanelMode('none')}
                  aria-label="Fechar formulário"
                  className="w-10 h-10 inline-flex items-center justify-center text-[#A1A1AA] hover:text-[#F5F4F0] border border-white/[0.08] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {submitted ? (
                <div className="py-8">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4A853]">
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Direcionamento registrado</span>
                  </div>
                  <p className="mt-3 text-base text-[#F5F4F0]">
                    Resumo preparado para <span className="font-semibold">{creatorName}</span> na
                    solução <span className="font-semibold">{selectedSolution}</span>.
                  </p>
                  <p className="mt-2 text-sm text-[#A1A1AA]">
                    {hasWhatsapp || hasEmail
                      ? 'Selecione um dos canais oficiais abaixo para enviar seu resumo.'
                      : 'Os canais oficiais de WhatsApp e e-mail estão prontos para configuração comercial.'}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {whatsappHref && (
                      <a
                        href={`${whatsappHref}?text=${encodeURIComponent(
                          `Olá Prumo Creators, sou ${creatorName} e tenho interesse em ${selectedSolution}. ${notes}`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[#070709] bg-[#D4A853] hover:bg-[#E5BE67]"
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
                        className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[#F5F4F0] border border-white/20 hover:border-[#D4A853]"
                      >
                        Enviar por E-mail
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={resetBrief}
                      className="px-4 py-3 text-xs font-medium text-[#A1A1AA] hover:text-[#F5F4F0] cursor-pointer"
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
                      className="block text-xs font-medium text-[#D4D4D8] mb-2"
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
                      className="w-full px-4 py-3 text-sm bg-[#070709] border border-white/[0.12] text-[#F5F4F0] placeholder:text-[#52525B] focus:outline-none focus:border-[#D4A853]"
                    />
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-[#D4D4D8] mb-2">
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
                              ? 'bg-[#D4A853]/15 border-[#D4A853] text-[#F5F4F0]'
                              : 'bg-[#070709] border-white/[0.08] text-[#A1A1AA] hover:text-[#F5F4F0]'
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
                      className="block text-xs font-medium text-[#D4D4D8] mb-2"
                    >
                      Objetivo da apresentação (opcional)
                    </label>
                    <textarea
                      id="creator-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Conte brevemente seu segmento e o momento atual do projeto"
                      className="w-full px-4 py-3 text-sm bg-[#070709] border border-white/[0.12] text-[#F5F4F0] placeholder:text-[#52525B] focus:outline-none focus:border-[#D4A853]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      className="px-6 py-3 text-xs font-semibold tracking-wide text-[#070709] bg-[#D4A853] hover:bg-[#E5BE67] transition-colors cursor-pointer"
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 max-w-3xl bg-[#0E0E13] border border-white/[0.12] p-7 sm:p-10"
            >
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#F5F4F0]">
                    Canais Comerciais Prumo Creators
                  </h3>
                  <p className="mt-1 text-xs text-[#A1A1AA]">
                    Estrutura preparada para atendimento oficial via WhatsApp e E-mail.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPanelMode('none')}
                  aria-label="Fechar canais"
                  className="w-10 h-10 inline-flex items-center justify-center text-[#A1A1AA] hover:text-[#F5F4F0] border border-white/[0.08] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-[#070709] border border-white/[0.08] flex flex-col justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-[#D4A853]" aria-hidden="true" />
                    <span className="text-sm font-semibold text-[#F5F4F0]">WhatsApp Oficial</span>
                  </div>
                  {whatsappHref ? (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-[#070709] bg-[#D4A853] hover:bg-[#E5BE67]"
                    >
                      <span>Iniciar conversa</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <p className="text-xs leading-relaxed text-[#A1A1AA]">
                      Canal preparado para receber o número comercial oficial da Prumo Creators.
                    </p>
                  )}
                </div>

                <div className="p-5 bg-[#070709] border border-white/[0.08] flex flex-col justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#D4A853]" aria-hidden="true" />
                    <span className="text-sm font-semibold text-[#F5F4F0]">E-mail Comercial</span>
                  </div>
                  {emailHref ? (
                    <a
                      href={emailHref}
                      className="inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-[#F5F4F0] border border-white/20 hover:border-[#D4A853]"
                    >
                      <span className="truncate">{OFFICIAL_CONTACT_CONFIG.emailAddress}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  ) : (
                    <p className="text-xs leading-relaxed text-[#A1A1AA]">
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
