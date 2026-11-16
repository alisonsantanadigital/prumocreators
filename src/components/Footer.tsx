export function Footer() {
  return (
    <footer className="bg-[#070709] border-t border-white/[0.08] py-12">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="font-display text-base font-bold tracking-tight text-[#F5F4F0]">
            PRUMO CREATORS
          </span>
          <p className="mt-1.5 text-xs text-[#A1A1AA]">
            Experiências digitais, posicionamento e apresentações comerciais para creators.
          </p>
        </div>

        <nav
          aria-label="Navegação do rodapé"
          className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#A1A1AA]"
        >
          <a href="#sobre" className="hover:text-[#F5F4F0] transition-colors">
            Sobre
          </a>
          <a href="#solucoes" className="hover:text-[#F5F4F0] transition-colors">
            Soluções
          </a>
          <a href="#portfolio" className="hover:text-[#F5F4F0] transition-colors">
            Portfólio
          </a>
          <a href="#diferencial" className="hover:text-[#F5F4F0] transition-colors">
            Diferencial
          </a>
          <a href="#contato" className="hover:text-[#F5F4F0] transition-colors">
            Contato
          </a>
        </nav>

        <p className="text-xs text-[#71717A] tabular-nums">
          © 2026 Prumo Creators. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
