import React from "react";
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
        Sou estudante de Sistemas para Internet e apaixonado por programação.
        Gosto de desenvolver aplicações web e mobile utilizando tecnologias
        modernas. Busco sempre aprender novas ferramentas e melhorar minhas
        habilidades como desenvolvedor.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  bio: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
});