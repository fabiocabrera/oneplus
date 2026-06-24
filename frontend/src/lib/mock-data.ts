export type StatusBoleto = "enviado" | "pendente" | "erro" | "pago";
export type StatusCliente = "ativo" | "inativo" | "atrasado";

export interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  whatsapp: string;
  seguradora: string;
  vencimento: string; // dia do mês
  proximoVencimento: string; // ISO date
  status: StatusCliente;
  valor: number;
}

export interface Boleto {
  id: string;
  clienteId: string;
  clienteNome: string;
  seguradora: string;
  vencimento: string;
  valor: number;
  status: StatusBoleto;
  enviadoEm: string | null;
  pdfUrl: string;
}

export interface LogEntry {
  id: string;
  data: string;
  modulo: string;
  seguradora: string;
  tipo: "info" | "aviso" | "erro" | "sucesso";
  detalhe: string;
}

export interface Seguradora {
  id: string;
  nome: string;
  status: "conectado" | "instavel" | "desconectado";
  portal: string;
  login: string;
  ultimaSync: string;
  clientes: number;
}

export const seguradoras: Seguradora[] = [
  {
    id: "amil",
    nome: "Amil",
    status: "conectado",
    portal: "https://portal.amil.com.br",
    login: "oneplus.financeiro",
    ultimaSync: "Hoje, 07:02",
    clientes: 184,
  },
  {
    id: "sulamerica",
    nome: "SulAmérica",
    status: "conectado",
    portal: "https://corretor.sulamerica.com.br",
    login: "oneplus.adm",
    ultimaSync: "Hoje, 07:05",
    clientes: 142,
  },
  {
    id: "bradesco",
    nome: "Bradesco Saúde",
    status: "instavel",
    portal: "https://portal.bradescosaude.com.br",
    login: "oneplus.adm",
    ultimaSync: "Hoje, 07:11",
    clientes: 96,
  },
  {
    id: "porto",
    nome: "Porto Seguro",
    status: "conectado",
    portal: "https://corretor.portoseguro.com.br",
    login: "oneplus.financeiro",
    ultimaSync: "Hoje, 07:14",
    clientes: 58,
  },
  {
    id: "omint",
    nome: "Omint",
    status: "desconectado",
    portal: "https://portal.omint.com.br",
    login: "oneplus.adm",
    ultimaSync: "Ontem, 07:09",
    clientes: 31,
  },
  {
    id: "unimed",
    nome: "Unimed",
    status: "conectado",
    portal: "https://portal.unimed.coop.br",
    login: "oneplus.adm",
    ultimaSync: "Hoje, 07:18",
    clientes: 207,
  },
];

const nomes = [
  "Adriana Martins",
  "Bruno Carvalho",
  "Camila Soares",
  "Diego Almeida",
  "Eduarda Lima",
  "Fernando Ribeiro",
  "Gabriela Tavares",
  "Henrique Oliveira",
  "Isabela Moura",
  "João Vitor Costa",
  "Karina Pinto",
  "Leandro Souza",
  "Mariana Duarte",
  "Natália Freitas",
  "Otávio Barros",
  "Patrícia Nogueira",
  "Rafael Vieira",
  "Sabrina Cunha",
  "Thiago Mendes",
  "Vanessa Rocha",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function isoIn(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export const clientes: Cliente[] = nomes.map((nome, i) => {
  const seg = seguradoras[i % seguradoras.length];
  const dia = 3 + (i % 25);
  return {
    id: `cli-${i + 1}`,
    nome,
    cpf: `${pad(100 + i)}.${pad(200 + i)}.${pad(300 + i)}-${pad(i + 10)}`.slice(0, 14),
    whatsapp: `+55 11 9${pad(1000 + i)}-${pad(2000 + i)}`.slice(0, 19),
    seguradora: seg.nome,
    vencimento: `Dia ${dia}`,
    proximoVencimento: isoIn((i % 12) - 1),
    status: i % 7 === 0 ? "atrasado" : i % 11 === 0 ? "inativo" : "ativo",
    valor: 480 + ((i * 37) % 2100),
  };
});

export const boletos: Boleto[] = Array.from({ length: 60 }).map((_, i) => {
  const cli = clientes[i % clientes.length];
  const status: StatusBoleto =
    i % 9 === 0 ? "erro" : i % 5 === 0 ? "pendente" : i % 3 === 0 ? "pago" : "enviado";
  return {
    id: `bol-${i + 1}`,
    clienteId: cli.id,
    clienteNome: cli.nome,
    seguradora: cli.seguradora,
    vencimento: isoIn((i % 20) - 5),
    valor: cli.valor,
    status,
    enviadoEm: status === "pendente" ? null : isoIn(-(i % 15)),
    pdfUrl: "#",
  };
});

export const logs: LogEntry[] = Array.from({ length: 40 }).map((_, i) => {
  const seg = seguradoras[i % seguradoras.length];
  const tipos: LogEntry["tipo"][] = ["info", "sucesso", "aviso", "erro"];
  const tipo = tipos[i % tipos.length];
  return {
    id: `log-${i + 1}`,
    data: `2026-06-${pad(24 - (i % 20))} ${pad(7 + (i % 12))}:${pad((i * 7) % 60)}:${pad((i * 13) % 60)}`,
    modulo: ["Scraper", "WhatsApp", "Agendador", "Auth", "PDF"][i % 5],
    seguradora: seg.nome,
    tipo,
    detalhe: {
      info: "Login no portal realizado com sucesso.",
      sucesso: "Boleto baixado e mensagem enviada ao cliente.",
      aviso: "Tempo de resposta acima do esperado (8.2s).",
      erro: "Falha de autenticação: captcha não resolvido.",
    }[tipo],
  };
});

export const dashboard = {
  clientesAtivos: clientes.filter((c) => c.status === "ativo").length,
  boletosMes: 487,
  proximosVencimentos: clientes.filter((c) => {
    const d = new Date(c.proximoVencimento);
    const diff = (d.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 10;
  }).length,
  alertas: 3,
};

export const proximosVencimentos = [...clientes]
  .filter((c) => {
    const diff = (new Date(c.proximoVencimento).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff >= -1 && diff <= 10;
  })
  .sort((a, b) => a.proximoVencimento.localeCompare(b.proximoVencimento))
  .slice(0, 10);

export const alertas = [
  {
    id: 1,
    severidade: "alta" as const,
    titulo: "Falha no portal Omint",
    descricao: "3 tentativas de login falharam nas últimas 24h.",
    tempo: "há 2h",
  },
  {
    id: 2,
    severidade: "media" as const,
    titulo: "Bradesco Saúde com lentidão",
    descricao: "Tempo médio de scraping subiu para 18s.",
    tempo: "há 5h",
  },
  {
    id: 3,
    severidade: "baixa" as const,
    titulo: "5 boletos pendentes de envio",
    descricao: "Reenvio automático agendado para 19h.",
    tempo: "hoje",
  },
];

export const execucoes = [
  {
    id: 1,
    inicio: "2026-06-24 07:00:12",
    duracao: "12m 04s",
    processados: 718,
    sucesso: 702,
    erro: 16,
    status: "sucesso" as const,
  },
  {
    id: 2,
    inicio: "2026-06-23 07:00:08",
    duracao: "11m 38s",
    processados: 715,
    sucesso: 711,
    erro: 4,
    status: "sucesso" as const,
  },
  {
    id: 3,
    inicio: "2026-06-22 07:00:10",
    duracao: "14m 22s",
    processados: 712,
    sucesso: 689,
    erro: 23,
    status: "aviso" as const,
  },
  {
    id: 4,
    inicio: "2026-06-21 07:00:09",
    duracao: "11m 51s",
    processados: 712,
    sucesso: 712,
    erro: 0,
    status: "sucesso" as const,
  },
  {
    id: 5,
    inicio: "2026-06-20 07:00:11",
    duracao: "—",
    processados: 0,
    sucesso: 0,
    erro: 0,
    status: "erro" as const,
  },
];

export function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR");
}
