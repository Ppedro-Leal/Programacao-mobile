import { View, Text, Image, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/profile.jpg")}
        style={styles.image}
      />
      <Text style={styles.name}>Pedro Henrique Leal Amaral</Text>
      <Text style={styles.bio}>
        Desenvolvedor apaixonado por tecnologia, com experiência em React,
        Node.js e banco de dados. Gosto de criar soluções práticas e modernas.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 20 },
  image: { width: 120, height: 120, borderRadius: 60 },
  name: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
  bio: { textAlign: "center", marginTop: 10, paddingHorizontal: 20 },
});