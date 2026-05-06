import { useEffect, useState } from "react";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { getPessoaById, Pessoa } from "../../api/api";
import { colors } from "../../theme/theme";
import { ProfileSectionCard } from "../../components/ProfileSectionCard";

export default function Perfil() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [loading, setLoading] = useState(true);

  async function carregarPessoa() {
    try {
      const data = await getPessoaById(String(id));
      setPessoa(data);
    } catch (error) {
      console.log("Erro ao carregar perfil:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarPessoa();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileBox}>
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{pessoa?.nome}</Text>
            <Text style={styles.role}>{pessoa?.cargo}</Text>

            <View style={styles.locationRow}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={14}
                color={colors.muted}
              />
              <Text style={styles.muted}>Recife, PE</Text>
            </View>
          </View>

          <Button
            mode="outlined"
            icon="pencil-outline"
            textColor={colors.text}
            style={styles.editButton}
            onPress={() => router.push(`/editar/${pessoa?.id}`)}
          >
            Editar
          </Button>
        </View>

        <Text style={styles.resume}>{pessoa?.resumo}</Text>

        <View style={styles.contactBox}>
          <Text style={styles.contactTitle}>Contato</Text>

          <View style={styles.contactRow}>
            <MaterialCommunityIcons name="email-outline" size={16} color={colors.accent} />
            <Text style={styles.contact}>{pessoa?.email}</Text>
          </View>

          {pessoa?.telefone ? (
            <View style={styles.contactRow}>
              <MaterialCommunityIcons name="phone-outline" size={16} color={colors.accent} />
              <Text style={styles.contact}>{pessoa.telefone}</Text>
            </View>
          ) : null}

          {pessoa?.github ? (
            <View style={styles.contactRow}>
              <MaterialCommunityIcons name="github" size={16} color={colors.accent} />
              <Text style={styles.contact}>{pessoa.github}</Text>
            </View>
          ) : null}

          {pessoa?.linkedin ? (
            <View style={styles.contactRow}>
              <MaterialCommunityIcons name="linkedin" size={16} color={colors.accent} />
              <Text style={styles.contact}>{pessoa.linkedin}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.linkButtons}>
          {pessoa?.github ? (
            <Button
              mode="contained"
              buttonColor={colors.accent}
              textColor={colors.white}
              icon="github"
              onPress={() => Linking.openURL(pessoa.github!)}
            >
              GitHub
            </Button>
          ) : null}

          {pessoa?.linkedin ? (
            <Button
              mode="outlined"
              textColor={colors.text}
              icon="linkedin"
              style={styles.secondaryButton}
              onPress={() => Linking.openURL(pessoa.linkedin!)}
            >
              LinkedIn
            </Button>
          ) : null}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Seções do Currículo</Text>

      <ProfileSectionCard
        icon="briefcase-outline"
        title="Experiência Profissional"
        description="Empresas, cargos, períodos e atividades profissionais"
        onPress={() => router.push(`../profissional/${pessoa?.id}`)}
      />

      <ProfileSectionCard
        icon="school-outline"
        title="Experiência Acadêmica"
        description="Cursos, instituições, formações e períodos"
        onPress={() => router.push(`../academica/${pessoa?.id}`)}
      />

      <ProfileSectionCard
        icon="check-circle-outline"
        title="Habilidades"
        description="Tecnologias, ferramentas e competências"
        onPress={() => router.push(`../habilidades/${pessoa?.id}`)}
      />

      <ProfileSectionCard
        icon="folder-outline"
        title="Projetos"
        description="Projetos desenvolvidos, descrições e links"
        onPress={() => router.push(`../projetos/${pessoa?.id}`)}
      />
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
  profileBox: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "bold",
  },
  role: {
    color: colors.accent,
    fontWeight: "bold",
    marginTop: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  muted: {
    color: colors.muted,
    marginLeft: 3,
    fontSize: 12,
  },
  editButton: {
    borderColor: colors.border,
    borderRadius: 12,
  },
  resume: {
    color: colors.muted,
    lineHeight: 21,
    marginTop: 18,
    marginBottom: 14,
  },
  contactBox: {
    marginTop: 8,
    backgroundColor: colors.card2,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactTitle: {
    color: colors.text,
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 15,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  contact: {
    color: colors.muted,
    flex: 1,
  },
  linkButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  secondaryButton: {
    borderColor: colors.border,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 14,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bg,
  },
});