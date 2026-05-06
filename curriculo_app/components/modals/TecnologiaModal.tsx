import { Modal, TextInput, Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/theme";

type Props = {
  visible: boolean;
  editando: any;
  form: {
    nome: string;
    categoria: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      nome: string;
      categoria: string;
    }>
  >;
  onSave: () => void;
  onClose: () => void;
};

export function TecnologiaModal({
  visible,
  editando,
  form,
  setForm,
  onSave,
  onClose,
}: Props) {
  return (
    <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modal}>
      <Text style={styles.modalTitle}>
        {editando ? "Editar habilidade" : "Adicionar habilidade"}
      </Text>

      <TextInput
        label="Nome da habilidade"
        value={form.nome}
        onChangeText={(v) => setForm((old) => ({ ...old, nome: v }))}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Categoria"
        value={form.categoria}
        onChangeText={(v) => setForm((old) => ({ ...old, categoria: v }))}
        mode="outlined"
        style={styles.input}
      />

      <Button mode="contained" buttonColor={colors.accent} onPress={onSave}>
        Salvar
      </Button>

      <Button mode="text" textColor={colors.muted} onPress={onClose}>
        Cancelar
      </Button>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.card,
    margin: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.card,
    marginBottom: 12,
  },
});