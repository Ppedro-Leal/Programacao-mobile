# 📱 App de Tarefas - React Native + Expo

## 📖 Descrição

Este projeto consiste no desenvolvimento de um aplicativo mobile para gerenciamento de tarefas, construído com **React Native utilizando Expo**.

A aplicação permite ao usuário criar, visualizar, atualizar e excluir tarefas, consumindo uma **API RESTful desenvolvida previamente na disciplina de Aplicações Orientadas a Serviço (AOS)**.

---

## 🚀 Tecnologias Utilizadas

### Mobile
- React Native
- Expo
- Expo Router
- TanStack Query
- Axios
- Expo Vector Icons

### Backend (integração)
- Node.js
- Express
- Sequelize
- PostgreSQL (NeonDB)
- API RESTful hospedada na Vercel

---

## 🔗 Integração com API

O aplicativo consome uma API RESTful responsável pelo gerenciamento das tarefas.

### Endpoints utilizados
- `GET /tarefas` → Listar tarefas
- `POST /tarefas` → Criar tarefa
- `PUT /tarefas/:objectId` → Atualizar tarefa
- `DELETE /tarefas/:objectId` → Remover tarefa

### URL da API
```txt
https://aplicacoes-orientadas-aservico-tarefas.vercel.app
```

---

## Link do repositório da API

👉 ** https://github.com/Ppedro-Leal/AplicacoesOrientadasAservico/tree/main/ativ_tarefas **

---

## 📱 Funcionalidades

- Criar novas tarefas
- Listar tarefas cadastradas
- Marcar tarefa como concluída
- Editar descrição da tarefa
- Excluir tarefa
- Atualização automática da lista com React Query
- Interface estilizada com modal de edição

---

## 🎨 Interface

A aplicação utiliza uma paleta de cores personalizada para manter consistência visual entre as telas.

### Paleta utilizada
- `#CBDAD5`
- `#89A7B1`
- `#566981`
- `#3A415A`
- `#34344E`

### Elementos visuais
- Cards para exibição das tarefas
- Botões com ícones
- Modal para edição
- Feedback visual de carregamento
- Tela inicial e tela Sobre no mesmo padrão de identidade visual

---

## 🌐 Link do Expo

👉 ** https://expo.dev/preview/update?message=Melhora+de+interface+e+adi%C3%A7%C3%A3o+da+API+criada+em+AOS&updateRuntimeVersion=1.0.0&createdAt=2026-04-20T02%3A45%3A42.363Z&slug=exp&projectId=c2f95e2a-4c52-4e53-a390-5eff81b028b8&group=3bc6e095-170e-4276-8544-7ea2fd124308 **

---

## 🧠 Estrutura do Projeto

A aplicação foi organizada para separar a interface da comunicação com a API.

### Exemplo de organização
```txt
app/
├── index.tsx
├── about.tsx
├── tarefas/
│   └── index.tsx

api/
└── index.ts
```

---

## 🔄 Comunicação com a API

A comunicação com o backend foi feita utilizando **Axios**, enquanto o controle de cache, atualização e mutations foi feito com **TanStack Query**.

Isso permitiu:

- Atualização automática da lista após criação, edição e remoção
- Melhor gerenciamento de loading e erros
- Código mais organizado para integração com a API RESTful

---
