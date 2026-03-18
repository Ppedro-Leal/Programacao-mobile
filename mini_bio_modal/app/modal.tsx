import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>Mais sobre mim</Text>

        <Text style={styles.text}>
          Tenho experiência com desenvolvimento full stack, incluindo APIs com
          Node.js, bancos de dados como MongoDB e MySQL, além de projetos mobile
          com React Native.
        </Text>

        <Button title="Fechar" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", 
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  text: { marginBottom: 20 },
});