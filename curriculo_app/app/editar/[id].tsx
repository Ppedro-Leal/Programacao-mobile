import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getPessoaById, updatePessoa } from "../../api/api";
import { colors } from "../../theme/theme";

export default function EditarPerfil() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  async function carregar() {
    try {
      const pessoa = await getPessoaById(String(id));
      setForm({
        nome: pessoa.nome || "",
        cargo: pessoa.cargo || "",
        resumo: pessoa.resumo || "",
        email: pessoa.email || "",
        telefone: pessoa.telefone || "",
        linkedin: pessoa.linkedin || "",
        github: pessoa.github || "",
      });
    } catch {
      Alert.alert("Erro", "Não foi possível carregar o perfil.");
    } finally {
      setLoading(false);
    }
  }

  async function salvar() {
    if (!form.nome || !form.cargo || !form.resumo || !form.email) {
      Alert.alert("Campos obrigatórios", "Preencha nome, cargo, resumo e email.");
      return;
    }

    try {
      setSaving(true);
      await updatePessoa(String(id), form);
      Alert.alert("Sucesso", "Perfil atualizado com sucesso.");
      router.back();
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [id]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={colors.accent}
        style={{ marginTop: 40 }}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Editar Perfil</Text>
        <Text style={styles.subtitle}>Atualize as informações principais.</Text>

        <TextInput label="Nome" value={form.nome} onChangeText={(v) => updateField("nome", v)} mode="outlined" style={styles.input} />
        <TextInput label="Cargo" value={form.cargo} onChangeText={(v) => updateField("cargo", v)} mode="outlined" style={styles.input} />
        <TextInput label="Resumo" value={form.resumo} onChangeText={(v) => updateField("resumo", v)} mode="outlined" multiline numberOfLines={4} style={styles.input} />
        <TextInput label="Email" value={form.email} onChangeText={(v) => updateField("email", v)} mode="outlined" keyboardType="email-address" style={styles.input} />
        <TextInput label="Telefone" value={form.telefone} onChangeText={(v) => updateField("telefone", v)} mode="outlined" style={styles.input} />
        <TextInput label="LinkedIn" value={form.linkedin} onChangeText={(v) => updateField("linkedin", v)} mode="outlined" style={styles.input} />
        <TextInput label="GitHub" value={form.github} onChangeText={(v) => updateField("github", v)} mode="outlined" style={styles.input} />

        <Button mode="contained" buttonColor={colors.accent} onPress={salvar} loading={saving}>
          Salvar Alterações
        </Button>
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
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.muted,
    marginBottom: 18,
    marginTop: 4,
  },
  input: {
    backgroundColor: colors.card,
    marginBottom: 12,
  },
});