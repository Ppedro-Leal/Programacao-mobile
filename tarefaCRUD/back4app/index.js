import axios from "axios";

const urlBase = "https://parseapi.back4app.com/classes/Tarefa";
const headers = {
  "X-Parse-Application-Id": "4Ym6k0AHWsQmDtCHHF3rrkMY8bx5Ts9Df8sp9uvd",
  "X-Parse-JavaScript-Key": "bTZO7p6XLKxZYIbPNZAtTz5C4pMoQAPsfzGv2kUA",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

export async function getTarefas() {
  const response = await axios.get(urlBase, {
    headers: headers,
  });
  return response.data.results;
}

export async function adicionarTarefa(novaTarefa) {
  const response = await axios.post(urlBase, novaTarefa, {
    headers: headersJson,
  });
  return response.data;
}

export async function atualizarTarefa(objectId, dados) {
  const response = await axios.put(
    `${urlBase}/${objectId}`,
    dados,
    {
      headers: headersJson,
    }
  );
  return response.data;
}

export async function deletarTarefa(objectId) {
  const response = await axios.delete(`${urlBase}/${objectId}`, {
    headers: headers,
  });
  return response.data;
}