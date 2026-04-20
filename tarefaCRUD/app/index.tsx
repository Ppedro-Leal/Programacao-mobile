import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Feather name="check-square" size={52} color="#3A415A" />

        <Text style={styles.title}>Lista de Tarefas</Text>
        <Text style={styles.subtitle}>
          Gerencie suas atividades de forma simples, bonita e organizada.
        </Text>

        <View style={styles.buttonsContainer}>
          <Link href="/tarefas" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <Feather name="list" size={18} color="#CBDAD5" />
              <Text style={styles.primaryButtonText}>Ir para tarefas</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/about" asChild>
            <TouchableOpacity style={styles.secondaryButton}>
              <Feather name="info" size={18} color="#34344E" />
              <Text style={styles.secondaryButtonText}>Sobre</Text>
            </TouchableOpacity>
          </Link>
        </View>
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
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#34344E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    marginTop: 16,
    fontSize: 30,
    fontWeight: "800",
    color: "#34344E",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: "#3A415A",
    textAlign: "center",
    lineHeight: 22,
  },
  buttonsContainer: {
    width: "100%",
    marginTop: 24,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#3A415A",
    borderRadius: 14,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  primaryButtonText: {
    color: "#CBDAD5",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "#CBDAD5",
    borderWidth: 1,
    borderColor: "#566981",
    borderRadius: 14,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  secondaryButtonText: {
    color: "#34344E",
    fontSize: 15,
    fontWeight: "700",
  },
});