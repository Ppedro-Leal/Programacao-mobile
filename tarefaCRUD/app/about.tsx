import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function About() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Feather name="info" size={48} color="#3A415A" />

        <Text style={styles.title}>Sobre o App</Text>

        <Text style={styles.description}>
          Este aplicativo foi desenvolvido como parte da disciplina de
          Programação para dispositivos moveis, com o objetivo de demonstrar a
          construção de uma Interface e sua integração com uma API restful criada na cadeira de Aplicações Orientadas a Serviço.
        </Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Tecnologias utilizadas</Text>

        <Text style={styles.techItem}>• React Native com Expo</Text>
        <Text style={styles.techItem}>• Expo Router</Text>
        <Text style={styles.techItem}>• TanStack Query</Text>
        <Text style={styles.techItem}>• Axios</Text>
        <Text style={styles.techItem}>• Node.js + Express</Text>
        <Text style={styles.techItem}>• PostgreSQL (NeonDB)</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Funcionalidades</Text>

        <Text style={styles.techItem}>• Criar tarefas</Text>
        <Text style={styles.techItem}>• Listar tarefas</Text>
        <Text style={styles.techItem}>• Atualizar tarefas</Text>
        <Text style={styles.techItem}>• Deletar tarefas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CBDAD5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#89A7B1",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(52, 52, 78, 0.2)",
  },

  title: {
    marginTop: 12,
    fontSize: 26,
    fontWeight: "800",
    color: "#34344E",
  },

  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#3A415A",
    textAlign: "center",
    lineHeight: 20,
  },

  sectionTitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "800",
    color: "#34344E",
  },

  techItem: {
    marginTop: 6,
    fontSize: 14,
    color: "#34344E",
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#566981",
    marginVertical: 12,
    opacity: 0.6,
  },
});