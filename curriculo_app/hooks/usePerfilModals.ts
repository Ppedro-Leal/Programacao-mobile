import { Alert } from "react-native";
import { useState } from "react";
import {
  Pessoa,
  createTecnologia,
  updateTecnologia,
  deleteTecnologia,
  createExperienciaAcademica,
  updateExperienciaAcademica,
  deleteExperienciaAcademica,
  createExperienciaProfissional,
  updateExperienciaProfissional,
  deleteExperienciaProfissional,
  createProjeto,
  updateProjeto,
  deleteProjeto,
} from "../api/api";

type ModalTipo = null | "tecnologia" | "academica" | "profissional" | "projeto";

export function usePerfilModals(
  pessoa: Pessoa | null,
  carregarPessoa: () => Promise<void>
) {
  const [modalTipo, setModalTipo] = useState<ModalTipo>(null);
  const [editando, setEditando] = useState<any>(null);

  const [tecnologiaForm, setTecnologiaForm] = useState({
    nome: "",
    categoria: "",
  });

  const [academicaForm, setAcademicaForm] = useState({
    instituicao: "",
    curso: "",
    periodo: "",
    descricao: "",
  });

  const [profissionalForm, setProfissionalForm] = useState({
    empresa: "",
    cargo: "",
    periodo: "",
    descricao: "",
  });

  const [projetoForm, setProjetoForm] = useState({
    titulo: "",
    descricao: "",
    link: "",
  });

  function fecharModal() {
    setModalTipo(null);
    setEditando(null);
  }

  function abrirModalTecnologia(item?: any) {
    setEditando(item || null);
    setTecnologiaForm({
      nome: item?.nome || "",
      categoria: item?.categoria || "",
    });
    setModalTipo("tecnologia");
  }

  function abrirModalAcademica(item?: any) {
    setEditando(item || null);
    setAcademicaForm({
      instituicao: item?.instituicao || "",
      curso: item?.curso || "",
      periodo: item?.periodo || "",
      descricao: item?.descricao || "",
    });
    setModalTipo("academica");
  }

  function abrirModalProfissional(item?: any) {
    setEditando(item || null);
    setProfissionalForm({
      empresa: item?.empresa || "",
      cargo: item?.cargo || "",
      periodo: item?.periodo || "",
      descricao: item?.descricao || "",
    });
    setModalTipo("profissional");
  }

  function abrirModalProjeto(item?: any) {
    setEditando(item || null);
    setProjetoForm({
      titulo: item?.titulo || "",
      descricao: item?.descricao || "",
      link: item?.link || "",
    });
    setModalTipo("projeto");
  }

  async function salvarTecnologia() {
    if (!pessoa) return;

    if (!tecnologiaForm.nome.trim() || !tecnologiaForm.categoria.trim()) {
      Alert.alert("Atenção", "Preencha nome e categoria da habilidade.");
      return;
    }

    if (editando) {
      await updateTecnologia(editando.id, {
        ...tecnologiaForm,
        pessoaId: pessoa.id,
      });
    } else {
      await createTecnologia({
        ...tecnologiaForm,
        pessoaId: pessoa.id,
      });
    }

    fecharModal();
    await carregarPessoa();
  }

  async function salvarAcademica() {
    if (!pessoa) return;

    if (
      !academicaForm.instituicao.trim() ||
      !academicaForm.curso.trim() ||
      !academicaForm.periodo.trim()
    ) {
      Alert.alert("Atenção", "Preencha instituição, curso e período.");
      return;
    }

    if (editando) {
      await updateExperienciaAcademica(editando.id, {
        ...academicaForm,
        pessoaId: pessoa.id,
      });
    } else {
      await createExperienciaAcademica({
        ...academicaForm,
        pessoaId: pessoa.id,
      });
    }

    fecharModal();
    await carregarPessoa();
  }

  async function salvarProfissional() {
    if (!pessoa) return;

    if (
      !profissionalForm.empresa.trim() ||
      !profissionalForm.cargo.trim() ||
      !profissionalForm.periodo.trim()
    ) {
      Alert.alert("Atenção", "Preencha empresa, cargo e período.");
      return;
    }

    if (editando) {
      await updateExperienciaProfissional(editando.id, {
        ...profissionalForm,
        pessoaId: pessoa.id,
      });
    } else {
      await createExperienciaProfissional({
        ...profissionalForm,
        pessoaId: pessoa.id,
      });
    }

    fecharModal();
    await carregarPessoa();
  }

  async function salvarProjeto() {
    if (!pessoa) return;

    if (!projetoForm.titulo.trim() || !projetoForm.descricao.trim()) {
      Alert.alert("Atenção", "Preencha título e descrição.");
      return;
    }

    if (editando) {
      await updateProjeto(editando.id, {
        ...projetoForm,
        pessoaId: pessoa.id,
      });
    } else {
      await createProjeto({
        ...projetoForm,
        pessoaId: pessoa.id,
      });
    }

    fecharModal();
    await carregarPessoa();
  }

  function confirmarExcluir(tipo: string, id: number) {
    Alert.alert("Excluir item", "Deseja realmente excluir este item?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          if (tipo === "tecnologia") await deleteTecnologia(id);
          if (tipo === "academica") await deleteExperienciaAcademica(id);
          if (tipo === "profissional") await deleteExperienciaProfissional(id);
          if (tipo === "projeto") await deleteProjeto(id);

          await carregarPessoa();
        },
      },
    ]);
  }

  return {
    modalTipo,
    editando,

    tecnologiaForm,
    setTecnologiaForm,
    academicaForm,
    setAcademicaForm,
    profissionalForm,
    setProfissionalForm,
    projetoForm,
    setProjetoForm,

    fecharModal,
    abrirModalTecnologia,
    abrirModalAcademica,
    abrirModalProfissional,
    abrirModalProjeto,

    salvarTecnologia,
    salvarAcademica,
    salvarProfissional,
    salvarProjeto,
    confirmarExcluir,
  };
}