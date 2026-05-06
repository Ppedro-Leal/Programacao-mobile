import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Chip, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../theme/theme";

export default function SobreApp() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Sobre o Aplicativo</Text>
      <Text style={styles.subtitle}>
        Plataforma mobile para gerenciamento, criação e visualização de currículos profissionais.
      </Text>

      {/* O QUE O APP FAZ */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.iconTitle}>
            <MaterialCommunityIcons
              name="application-outline"
              size={24}
              color={colors.accent}
            />
            <Text style={styles.cardTitle}>O que o app faz</Text>
          </View>

          <Text style={styles.text}>
            Este aplicativo permite visualizar currículos cadastrados, acessar
            informações completas de cada perfil e realizar operações de criação,
            edição e exclusão de dados em tempo real.
          </Text>

          <Text style={styles.text}>
            Ele simula uma plataforma de portfólio profissional, onde múltiplos
            usuários podem gerenciar seus dados de forma simples e intuitiva.
          </Text>
        </Card.Content>
      </Card>

      {/* COMO FUNCIONA */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.iconTitle}>
            <MaterialCommunityIcons
              name="cog-outline"
              size={24}
              color={colors.accent}
            />
            <Text style={styles.cardTitle}>Como funciona</Text>
          </View>

          <Text style={styles.text}>
            O aplicativo consome uma API REST hospedada na nuvem, permitindo
            comunicação entre o front-end mobile e o back-end.
          </Text>

          <Text style={styles.text}>
            Todas as operações (CRUD) são feitas em tempo real utilizando
            requisições HTTP.
          </Text>
        </Card.Content>
      </Card>

      {/* TECNOLOGIAS */}
      <Text style={styles.sectionTitle}>Tecnologias utilizadas</Text>

      <Text style={styles.subSection}>Front-end</Text>
      <View style={styles.chips}>
        {[
          "React Native",
          "Expo",
          "Expo Router",
          "React Native Paper",
          "TypeScript",
          "Axios",
        ].map((item) => (
          <Chip key={item} style={styles.chip} textStyle={styles.chipText}>
            {item}
          </Chip>
        ))}
      </View>

      <Text style={styles.subSection}>Back-end</Text>
      <View style={styles.chips}>
        {[
          "Node.js",
          "Express",
          "Sequelize",
          "PostgreSQL",
          "NeonDB",
          "Vercel",
        ].map((item) => (
          <Chip key={item} style={styles.chip} textStyle={styles.chipText}>
            {item}
          </Chip>
        ))}
      </View>

      {/* DIFERENCIAL */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.iconTitle}>
            <MaterialCommunityIcons
              name="star-outline"
              size={24}
              color={colors.accent}
            />
            <Text style={styles.cardTitle}>Diferencial do projeto</Text>
          </View>

          <Text style={styles.text}>
            O aplicativo vai além da simples exibição de dados, permitindo que o
            usuário gerencie completamente os currículos diretamente pelo celular.
          </Text>

          <Text style={styles.text}>
            Além disso, a interface foi projetada com foco em usabilidade e
            experiência do usuário, proporcionando um visual moderno e intuitivo.
          </Text>
        </Card.Content>
      </Card>

      {/* FUNCIONALIDADE EXTRA */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.iconTitle}>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={24}
              color={colors.accent}
            />
            <Text style={styles.cardTitle}>Funcionalidade extra</Text>
          </View>

          <Text style={styles.text}>
            Implementação completa de CRUD no aplicativo mobile, permitindo:
          </Text>

          <Text style={styles.bullet}>• Criar novos currículos</Text>
          <Text style={styles.bullet}>• Editar informações existentes</Text>
          <Text style={styles.bullet}>• Excluir perfis</Text>
          <Text style={styles.bullet}>• Buscar currículos</Text>
        </Card.Content>
      </Card>
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
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.muted,
    marginTop: 6,
    marginBottom: 22,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 18,
  },
  iconTitle: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    color: colors.muted,
    lineHeight: 21,
    marginTop: 6,
  },
  bullet: {
    color: colors.muted,
    marginTop: 4,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subSection: {
    color: colors.accent,
    fontWeight: "bold",
    marginBottom: 6,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: colors.card2,
  },
  chipText: {
    color: colors.text,
  },
});