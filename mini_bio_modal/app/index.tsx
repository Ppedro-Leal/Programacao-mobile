import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Profile from "../components/Profile";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        App criado para a disciplina Programação para Dispositivos Móveis
      </Text>

      <Profile />

      <Link href="/modal" asChild>
        <Button title="Ver mais sobre mim" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, marginBottom: 20, textAlign: "center" },
});