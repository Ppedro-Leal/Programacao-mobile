import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Portal, Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";

import { getPessoaById, Pessoa } from "../../api/api";
import { colors } from "../../theme/theme";
import { CurriculoSection } from "../../components/CurriculoSection";
import { SectionHeader } from "../../components/SectionHeader";
import { AcademicaModal } from "../../components/modals/AcademicaModal";
import { usePerfilModals } from "../../hooks/usePerfilModals";

export default function Academica() {
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
    academicaForm,
    setAcademicaForm,
    abrirModalAcademica,
    salvarAcademica,
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
          title="Experiência Acadêmica"
          buttonLabel="Adicionar formação"
          onAdd={() => abrirModalAcademica()}
        />

        {pessoa?.ExperienciaAcademicas?.length ? (
          pessoa.ExperienciaAcademicas.map((item: any) => (
            <CurriculoSection
              key={item.id}
              icon="school-outline"
              title={item.curso}
              subtitle={`${item.instituicao} • ${item.periodo}`}
              description={item.descricao}
              color={colors.accentStrong}
              onEdit={() => abrirModalAcademica(item)}
              onDelete={() => confirmarExcluir("academica", item.id)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>
            Nenhuma experiência acadêmica cadastrada.
          </Text>
        )}
      </ScrollView>

      <Portal>
        <AcademicaModal
          visible={modalTipo === "academica"}
          editando={editando}
          form={academicaForm}
          setForm={setAcademicaForm}
          onSave={salvarAcademica}
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