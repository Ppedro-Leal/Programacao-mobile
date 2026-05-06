import { Modal, TextInput, Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/theme";

type Props = {
  visible: boolean;
  editando: any;
  form: {
    empresa: string;
    cargo: string;
    periodo: string;
    descricao: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      empresa: string;
      cargo: string;
      periodo: string;
      descricao: string;
    }>
  >;
  onSave: () => void;
  onClose: () => void;
};

export function ProfissionalModal({
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
        {editando
          ? "Editar experiência profissional"
          : "Adicionar experiência profissional"}
      </Text>

      <TextInput
        label="Empresa"
        value={form.empresa}
        onChangeText={(v) => setForm((old) => ({ ...old, empresa: v }))}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Cargo"
        value={form.cargo}
        onChangeText={(v) => setForm((old) => ({ ...old, cargo: v }))}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Período"
        value={form.periodo}
        onChangeText={(v) => setForm((old) => ({ ...old, periodo: v }))}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Descrição"
        value={form.descricao}
        onChangeText={(v) => setForm((old) => ({ ...old, descricao: v }))}
        mode="outlined"
        multiline
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