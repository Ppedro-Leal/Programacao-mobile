import { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { useFocusEffect, useRouter } from "expo-router";
import { deletePessoa, getPessoas, Pessoa } from "../../api/api";
import { colors } from "../../theme/theme";
import { ProfileListCard } from "../../components/ProfileListCard";

export default function Home() {
  const router = useRouter();

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  async function carregarPessoas() {
    try {
      setLoading(true);
      const data = await getPessoas();
      setPessoas(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os currículos.");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarPessoas();
    }, []),
  );

  function confirmarDelete(id: number) {
    Alert.alert("Excluir perfil", "Deseja remover este currículo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deletePessoa(id);
          carregarPessoas();
        },
      },
    ]);
  }

  const pessoasFiltradas = pessoas.filter((pessoa) => {
    const texto =
      `${pessoa.nome} ${pessoa.cargo} ${pessoa.email}`.toLowerCase();
    return texto.includes(busca.toLowerCase());
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>Currículo App</Text>
          <Text style={styles.subtitle}>
            Gerencie e compartilhe seus currículos profissionais
          </Text>
        </View>
      </View>

      <View style={styles.topRow}>
        <View>
          <Text style={styles.sectionTitle}>Perfis</Text>
          <Text style={styles.counter}>{pessoas.length} cadastrados</Text>
        </View>

        <Button
          mode="contained"
          icon="plus"
          buttonColor={colors.accent}
          onPress={() => router.push("/criar")}
          style={{
            borderRadius: 14,
            paddingHorizontal: 8,
          }}
          labelStyle={{
            fontWeight: "bold",
            fontSize: 13,
          }}
        >
          Criar currículo
        </Button>
      </View>

      <TextInput
        label="Buscar currículo"
        placeholder="Nome, cargo ou email"
        value={busca}
        onChangeText={setBusca}
        mode="outlined"
        activeOutlineColor={colors.accent}
        outlineColor={colors.border}
        textColor={colors.text}
        placeholderTextColor={colors.muted}
        style={styles.input}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.accent}
          style={{ marginTop: 30 }}
        />
      ) : (
        pessoasFiltradas.map((pessoa) => (
          <ProfileListCard
            key={pessoa.id}
            pessoa={pessoa}
            onPress={() => router.push(`../perfil/${pessoa.id}`)}
            onDelete={() => confirmarDelete(pessoa.id)}
          />
        ))
      )}

      {!loading && pessoasFiltradas.length === 0 && (
        <Text style={styles.empty}>Nenhum currículo encontrado.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: 18,
    paddingBottom: 30,
  },
  header: {
    marginTop: 8,
    marginBottom: 26,
  },
  appTitle: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.muted,
    marginTop: 4,
    fontSize: 13,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "bold",
  },
  counter: {
    color: colors.muted,
    marginTop: 2,
  },
  input: {
    backgroundColor: colors.card,
    marginBottom: 16,
  },
  empty: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 30,
  },
});
