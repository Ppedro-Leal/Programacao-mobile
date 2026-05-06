import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Portal, Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { getPessoaById, Pessoa } from "../../api/api";
import { colors } from "../../theme/theme";
import { SectionHeader } from "../../components/SectionHeader";
import { TecnologiaModal } from "../../components/modals/TecnologiaModal";
import { usePerfilModals } from "../../hooks/usePerfilModals";

export default function Habilidades() {
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
    tecnologiaForm,
    setTecnologiaForm,
    abrirModalTecnologia,
    salvarTecnologia,
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
          title="Habilidades"
          buttonLabel="Adicionar habilidade"
          onAdd={() => abrirModalTecnologia()}
        />

        {pessoa?.Tecnologia?.length ? (
          <View style={styles.techContainer}>
            {pessoa.Tecnologia.map((tec: any) => (
              <View key={tec.id} style={styles.techChip}>
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={16}
                  color={colors.accent}
                />

                <Text style={styles.techChipText}>{tec.nome}</Text>

                <Button
                  compact
                  mode="text"
                  textColor={colors.accent}
                  onPress={() => abrirModalTecnologia(tec)}
                >
                  Editar
                </Button>

                <Button
                  compact
                  mode="text"
                  textColor={colors.danger}
                  onPress={() => confirmarExcluir("tecnologia", tec.id)}
                >
                  Excluir
                </Button>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>Nenhuma habilidade cadastrada.</Text>
        )}
      </ScrollView>

      <Portal>
        <TecnologiaModal
          visible={modalTipo === "tecnologia"}
          editando={editando}
          form={tecnologiaForm}
          setForm={setTecnologiaForm}
          onSave={salvarTecnologia}
          onClose={fecharModal}
        />
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 18, paddingBottom: 30 },
  techContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  techChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  techChipText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
  },
  emptyText: { color: colors.muted, fontStyle: "italic" },
  loading: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    alignItems: "center",
  },
});