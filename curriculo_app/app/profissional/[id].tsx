import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Portal, Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";

import { getPessoaById, Pessoa } from "../../api/api";
import { colors } from "../../theme/theme";
import { CurriculoSection } from "../../components/CurriculoSection";
import { SectionHeader } from "../../components/SectionHeader";
import { ProfissionalModal } from "../../components/modals/ProfissionalModal";
import { usePerfilModals } from "../../hooks/usePerfilModals";

export default function Profissional() {
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
    profissionalForm,
    setProfissionalForm,
    abrirModalProfissional,
    salvarProfissional,
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
          title="Experiência Profissional"
          buttonLabel="Adicionar experiência"
          onAdd={() => abrirModalProfissional()}
        />

        {pessoa?.ExperienciaProfissionals?.length ? (
          pessoa.ExperienciaProfissionals.map((item: any) => (
            <CurriculoSection
              key={item.id}
              icon="briefcase-outline"
              title={item.cargo}
              subtitle={`${item.empresa} • ${item.periodo}`}
              description={item.descricao}
              color={colors.accent}
              onEdit={() => abrirModalProfissional(item)}
              onDelete={() => confirmarExcluir("profissional", item.id)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>
            Nenhuma experiência profissional cadastrada.
          </Text>
        )}
      </ScrollView>

      <Portal>
        <ProfissionalModal
          visible={modalTipo === "profissional"}
          editando={editando}
          form={profissionalForm}
          setForm={setProfissionalForm}
          onSave={salvarProfissional}
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