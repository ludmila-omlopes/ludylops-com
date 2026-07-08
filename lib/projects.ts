export type Project = {
  title: string;
  description: string;
  href: string;
  serviceRelated?: boolean;
  serviceStory?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "ludylops.live",
    description:
      "Interaja com minha live, sugira jogos, mande quotes pra tela e mais! Integrado com streamerbot e OBS.",
    href: "https://ludylops.live",
    serviceRelated: true,
    serviceStory:
      "Nasceu da minha própria live: interação com o chat, sugestão de jogos e quotes na tela, tudo integrado com Streamer.bot e OBS.",
  },
  {
    title: "filazo.app",
    description:
      "Biblioteca de jogos para reunir listas de diferentes fontes e facilitar a escolha do que jogar depois.",
    href: "https://filazo.app",
    serviceRelated: true,
    serviceStory:
      "Uma biblioteca que junta listas de jogos de várias fontes, feita para aposentar a planilha de \"o que jogar depois\".",
  },
  {
    title: "YouTube Analyzer MCP",
    description: "MCP local com Gemini para analisar vídeos do YouTube.",
    href: "https://github.com/ludmila-omlopes/youtube-video-analyzer-mcp",
    serviceRelated: true,
    serviceStory:
      "Ferramenta local que usa IA para analisar vídeos do YouTube: pesquisar e resumir sem assistir tudo de novo.",
  },
  {
    title: "Video Timeline Copilot",
    description: "Ferramenta para gerar timelines editaveis a partir de videos usando transcricao e IA.",
    href: "https://github.com/ludmila-omlopes/video-timeline-copilot",
    serviceRelated: true,
    serviceStory:
      "Gera timelines editáveis a partir da transcrição do vídeo. A parte chata da edição, automatizada.",
  },
  {
    title: "Talk to the Other Side",
    description: "Tradutor Estrangeiro <-> português para fãs de Ordem Paranormal RPG.",
    href: "https://other-side-nine.vercel.app/",
  },
  {
    title: "Lens Agora",
    description: "Um marketplace social na web3. Atualmente sendo migrado e repensado.",
    href: "https://lensagora.xyz",
  },
  {
    title: "ludylops.com",
    description: "Este site. Tudo o que eu crio, jogo e quebro.",
    href: "https://ludylops.com",
    serviceRelated: true,
    serviceStory: "Este site: projetado, escrito e construído por mim, do design ao deploy.",
  },
];

export const SERVICE_PROJECTS = PROJECTS.filter((project) => project.serviceRelated);
