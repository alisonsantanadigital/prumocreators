export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-[#F6F4EE] border-t border-white/10 py-12">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="text-sm font-semibold tracking-[0.18em] uppercase text-[#F6F4EE]">
            PRUMO CREATORS
          </span>
          <p className="mt-2 text-xs text-[#9A968E]">
            Apresentação comercial, identidade digital e experiências para creators.
          </p>
        </div>

        <nav
          aria-label="Navegação do rodapé"
          className="flex flex-wrap items-center gap-6 text-xs font-medium tracking-[0.08em] uppercase text-[#9A968E]"
        >
          <a href="#sobre" className="hover:text-[#F6F4EE] transition-colors">
            Sobre
          </a>
          <a href="#solucoes" className="hover:text-[#F6F4EE] transition-colors">
            Soluções
          </a>
          <a href="#portfolio" className="hover:text-[#F6F4EE] transition-colors">
            Portfólio
          </a>
          <a href="#diferencial" className="hover:text-[#F6F4EE] transition-colors">
            Diferencial
          </a>
          <a href="#contato" className="hover:text-[#F6F4EE] transition-colors">
            Contato
          </a>
        </nav>

        <p className="text-xs text-[#6B6860] tabular-nums">
          © 2026 Prumo Creators. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
