import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { createPessoa } from "../api/api";
import { colors } from "../theme/theme";

export default function CriarPerfil() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    cargo: "",
    resumo: "",
    email: "",
    telefone: "",
    linkedin: "",
    github: "",
  });

  function updateField(field: string, value: string) {
    setForm((old) => ({ ...old, [field]: value }));
  }

  const nomeInvalido = submitted && form.nome.trim().length < 3;
  const cargoInvalido = submitted && form.cargo.trim().length < 3;
  const resumoInvalido = submitted && form.resumo.trim().length < 20;
  const emailInvalido =
    submitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  const podeSalvar =
    form.nome.trim().length >= 3 &&
    form.cargo.trim().length >= 3 &&
    form.resumo.trim().length >= 20 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  async function salvar() {
    setSubmitted(true);

    if (!podeSalvar) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha corretamente nome, cargo, resumo e email."
      );
      return;
    }

    try {
      setLoading(true);

      await createPessoa({
        nome: form.nome.trim(),
        cargo: form.cargo.trim(),
        resumo: form.resumo.trim(),
        email: form.email.trim(),
        telefone: form.telefone.trim(),
        linkedin: form.linkedin.trim(),
        github: form.github.trim(),
      });

      Alert.alert("Sucesso", "Currículo criado com sucesso.");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar o currículo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Criar currículo</Text>
          <Text style={styles.subtitle}>
            Preencha os dados principais do perfil. Depois você poderá adicionar
            experiências, habilidades e projetos.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informações principais</Text>

          <TextInput
            label="Nome completo *"
            value={form.nome}
            onChangeText={(v) => updateField("nome", v)}
            mode="outlined"
            error={nomeInvalido}
            style={styles.input}
            activeOutlineColor={colors.accent}
            outlineColor={colors.border}
            textColor={colors.text}
          />
          <HelperText type="error" visible={nomeInvalido}>
            Informe um nome com pelo menos 3 caracteres.
          </HelperText>

          <TextInput
            label="Cargo ou área de atuação *"
            value={form.cargo}
            onChangeText={(v) => updateField("cargo", v)}
            mode="outlined"
            error={cargoInvalido}
            style={styles.input}
            activeOutlineColor={colors.accent}
            outlineColor={colors.border}
            textColor={colors.text}
          />
          <HelperText type="error" visible={cargoInvalido}>
            Informe um cargo válido.
          </HelperText>

          <TextInput
            label="Resumo profissional *"
            value={form.resumo}
            onChangeText={(v) => updateField("resumo", v)}
            mode="outlined"
            multiline
            numberOfLines={5}
            error={resumoInvalido}
            style={styles.textArea}
            activeOutlineColor={colors.accent}
            outlineColor={colors.border}
            textColor={colors.text}
          />
          <HelperText type="error" visible={resumoInvalido}>
            Escreva um resumo com pelo menos 20 caracteres.
          </HelperText>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contato</Text>

          <TextInput
            label="Email *"
            value={form.email}
            onChangeText={(v) => updateField("email", v)}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailInvalido}
            style={styles.input}
            activeOutlineColor={colors.accent}
            outlineColor={colors.border}
            textColor={colors.text}
          />
          <HelperText type="error" visible={emailInvalido}>
            Informe um email válido.
          </HelperText>

          <TextInput
            label="Telefone"
            value={form.telefone}
            onChangeText={(v) => updateField("telefone", v)}
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.input}
            activeOutlineColor={colors.accent}
            outlineColor={colors.border}
            textColor={colors.text}
          />

          <TextInput
            label="LinkedIn"
            value={form.linkedin}
            onChangeText={(v) => updateField("linkedin", v)}
            mode="outlined"
            autoCapitalize="none"
            style={styles.input}
            activeOutlineColor={colors.accent}
            outlineColor={colors.border}
            textColor={colors.text}
          />

          <TextInput
            label="GitHub"
            value={form.github}
            onChangeText={(v) => updateField("github", v)}
            mode="outlined"
            autoCapitalize="none"
            style={styles.input}
            activeOutlineColor={colors.accent}
            outlineColor={colors.border}
            textColor={colors.text}
          />
        </View>

        <View style={styles.footer}>
          <Button
            mode="contained"
            icon="content-save-outline"
            buttonColor={colors.accent}
            textColor={colors.white}
            loading={loading}
            disabled={loading}
            onPress={salvar}
            style={styles.saveButton}
            labelStyle={styles.saveButtonText}
          >
            Criar currículo
          </Button>

          <Button
            mode="text"
            textColor={colors.muted}
            disabled={loading}
            onPress={() => router.back()}
          >
            Cancelar
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: 18,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.muted,
    marginTop: 6,
    lineHeight: 21,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 14,
  },
  input: {
    backgroundColor: colors.card,
  },
  textArea: {
    backgroundColor: colors.card,
    minHeight: 120,
  },
  footer: {
    marginTop: 4,
    gap: 8,
  },
  saveButton: {
    borderRadius: 14,
    paddingVertical: 4,
  },
  saveButtonText: {
    fontWeight: "bold",
  },
});