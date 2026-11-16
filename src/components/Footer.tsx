import { PrumoMark } from './PrumoMark';

export function Footer() {
  return (
    <footer className="bg-[#111111] text-[#F2F0EB] border-t border-white/10 py-14">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <PrumoMark className="w-5 h-8 text-[#F2F0EB] shrink-0" />
          <div>
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#F2F0EB]">
              PRUMO CREATORS
            </span>
            <p className="mt-1 text-xs text-[#A7A49E]">Creative Architecture · Branding · Digital Experiences</p>
          </div>
        </div>

        <nav
          aria-label="Navegação do rodapé"
          className="flex flex-wrap items-center gap-7 text-[11px] font-medium tracking-[0.14em] uppercase text-[#A7A49E]"
        >
          <a href="#manifesto" className="hover:text-[#F2F0EB] transition-colors">
            Manifesto
          </a>
          <a href="#atuacao" className="hover:text-[#F2F0EB] transition-colors">
            Atuação
          </a>
          <a href="#portfolio" className="hover:text-[#F2F0EB] transition-colors">
            Selected Works
          </a>
          <a href="#visao" className="hover:text-[#F2F0EB] transition-colors">
            Visão
          </a>
          <a href="#processo" className="hover:text-[#F2F0EB] transition-colors">
            Processo
          </a>
          <a href="#contato" className="hover:text-[#F2F0EB] transition-colors">
            Contato
          </a>
        </nav>

        <p className="text-xs text-[#A7A49E] tabular-nums">© 2026 PRUMO CREATORS</p>
      </div>
    </footer>
  );
}
