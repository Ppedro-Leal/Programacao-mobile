import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Portal, Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";

import { getPessoaById, Pessoa } from "../../api/api";
import { colors } from "../../theme/theme";
import { CurriculoSection } from "../../components/CurriculoSection";
import { SectionHeader } from "../../components/SectionHeader";
import { ProjetoModal } from "../../components/modals/ProjetoModal";
import { usePerfilModals } from "../../hooks/usePerfilModals";

export default function Projetos() {
  const { id } = useLocalSearchParams();

  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [loading, setLoading] = useState(true);

  async function carregarPessoa() {
    try {
      const data = await getPessoaById(String(id));
      setPessoa(data);
    } finally {
      setLoading(false);
    }
  }

  const {
    modalTipo,
    editando,
    projetoForm,
    setProjetoForm,
    abrirModalProjeto,
    salvarProjeto,
    confirmarExcluir,
    fecharModal,
  } = usePerfilModals(pessoa, carregarPessoa);

  useEffect(() => {
    carregarPessoa();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <SectionHeader
          title="Projetos"
          buttonLabel="Adicionar projeto"
          onAdd={() => abrirModalProjeto()}
        />

        {pessoa?.Projetos?.length ? (
          pessoa.Projetos.map((item: any) => (
            <CurriculoSection
              key={item.id}
              icon="folder-outline"
              title={item.titulo}
              description={item.descricao}
              color={colors.accent}
              onEdit={() => abrirModalProjeto(item)}
              onDelete={() => confirmarExcluir("projeto", item.id)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhum projeto cadastrado.</Text>
        )}
      </ScrollView>

      <Portal>
        <ProjetoModal
          visible={modalTipo === "projeto"}
          editando={editando}
          form={projetoForm}
          setForm={setProjetoForm}
          onSave={salvarProjeto}
          onClose={fecharModal}
        />
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 18, paddingBottom: 30 },
  emptyText: { color: colors.muted, fontStyle: "italic" },
  loading: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    alignItems: "center",
  },
});