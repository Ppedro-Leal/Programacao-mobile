import axios from "axios";

const api = axios.create({
  baseURL: "https://aplicacoes-orientadas-aservico-tarefas.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getTarefas() {
  const response = await api.get("/tarefas");
  return response.data;
}

export async function adicionarTarefa(novaTarefa) {
  const response = await api.post("/tarefas", novaTarefa);
  return response.data;
}

export async function atualizarTarefa(objectId, dados) {
  const response = await api.put(`/tarefas/${objectId}`, dados);
  return response.data;
}

export async function deletarTarefa(objectId) {
  const response = await api.delete(`/tarefas/${objectId}`);
  return response.data;
}