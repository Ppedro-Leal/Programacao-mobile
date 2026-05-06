import axios from "axios";

export type Tecnologia = {
  id: number;
  nome: string;
  categoria: string;
};

export type ExperienciaAcademica = {
  id: number;
  instituicao: string;
  curso: string;
  periodo: string;
  descricao: string;
};

export type ExperienciaProfissional = {
  id: number;
  empresa: string;
  cargo: string;
  periodo: string;
  descricao: string;
};

export type Projeto = {
  id: number;
  titulo: string;
  descricao: string;
  link?: string;
};

export type Pessoa = {
  id: number;
  nome: string;
  cargo: string;
  resumo: string;
  email: string;
  telefone?: string;
  linkedin?: string;
  github?: string;
  ExperienciaAcademicas?: ExperienciaAcademica[];
  ExperienciaProfissionals?: ExperienciaProfissional[];
  Projetos?: Projeto[];
  Tecnologia?: Tecnologia[];
};

export type PessoaForm = {
  nome: string;
  cargo: string;
  resumo: string;
  email: string;
  telefone?: string;
  linkedin?: string;
  github?: string;
};

export const api = axios.create({
  baseURL: "https://aplicacoes-orientadas-aservico-curriculo.vercel.app",
});

export async function getPessoas(): Promise<Pessoa[]> {
  const response = await api.get("/pessoas");
  return response.data;
}

export async function getPessoaById(id: number | string): Promise<Pessoa> {
  const response = await api.get(`/pessoas/${id}`);
  return response.data;
}

export async function createPessoa(data: PessoaForm): Promise<Pessoa> {
  const response = await api.post("/pessoas", data);
  return response.data;
}

export async function updatePessoa(
  id: number | string,
  data: PessoaForm,
): Promise<Pessoa> {
  const response = await api.put(`/pessoas/${id}`, data);
  return response.data;
}

export async function deletePessoa(id: number | string) {
  const response = await api.delete(`/pessoas/${id}`);
  return response.data;
}

export async function createTecnologia(data: {
  nome: string;
  categoria: string;
  pessoaId: number;
}) {
  const response = await api.post("/tecnologia", data);
  return response.data;
}

export async function updateTecnologia(
  id: number,
  data: {
    nome: string;
    categoria: string;
    pessoaId: number;
  },
) {
  const response = await api.put(`/tecnologia/${id}`, data);
  return response.data;
}

export async function deleteTecnologia(id: number) {
  const response = await api.delete(`/tecnologia/${id}`);
  return response.data;
}

export async function createExperienciaAcademica(data: {
  instituicao: string;
  curso: string;
  periodo: string;
  descricao: string;
  pessoaId: number;
}) {
  const response = await api.post("/experiencias-academicas", data);
  return response.data;
}

export async function updateExperienciaAcademica(
  id: number,
  data: {
    instituicao: string;
    curso: string;
    periodo: string;
    descricao: string;
    pessoaId: number;
  },
) {
  const response = await api.put(`/experiencias-academicas/${id}`, data);
  return response.data;
}

export async function deleteExperienciaAcademica(id: number) {
  const response = await api.delete(`/experiencias-academicas/${id}`);
  return response.data;
}

export async function createExperienciaProfissional(data: {
  empresa: string;
  cargo: string;
  periodo: string;
  descricao: string;
  pessoaId: number;
}) {
  const response = await api.post("/experiencias-profissionais", data);
  return response.data;
}

export async function updateExperienciaProfissional(
  id: number,
  data: {
    empresa: string;
    cargo: string;
    periodo: string;
    descricao: string;
    pessoaId: number;
  },
) {
  const response = await api.put(`/experiencias-profissionais/${id}`, data);
  return response.data;
}

export async function deleteExperienciaProfissional(id: number) {
  const response = await api.delete(`/experiencias-profissionais/${id}`);
  return response.data;
}

export async function createProjeto(data: {
  titulo: string;
  descricao: string;
  link?: string;
  pessoaId: number;
}) {
  const response = await api.post("/projetos", data);
  return response.data;
}

export async function updateProjeto(
  id: number,
  data: {
    titulo: string;
    descricao: string;
    link?: string;
    pessoaId: number;
  },
) {
  const response = await api.put(`/projetos/${id}`, data);
  return response.data;
}

export async function deleteProjeto(id: number) {
  const response = await api.delete(`/projetos/${id}`);
  return response.data;
}
