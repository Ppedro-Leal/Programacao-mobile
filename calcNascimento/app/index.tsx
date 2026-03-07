import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function App() {
  const [idade, setIdade] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [anoNascimento, setAnoNascimento] = useState("");

  useEffect(() => {
    calcularAno();
  }, [idade, dia, mes]);

  const calcularAno = () => {
    if (idade === "" || dia === "" || mes === "") {
      setAnoNascimento("");
      return;
    }

    const hoje = new Date();

    const diaAtual = hoje.getDate();
    const mesAtual = hoje.getMonth() + 1;
    const anoAtual = hoje.getFullYear();

    let ano = anoAtual - parseInt(idade);

    if (
      parseInt(mes) > mesAtual ||
      (parseInt(mes) === mesAtual && parseInt(dia) > diaAtual)
    ) {
      ano = ano - 1;
    }

    setAnoNascimento(String(ano));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#2D2E47" }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <View style={styles.card}>
          <Text style={styles.titulo}>Calculadora de Nascimento</Text>

          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Digite sua idade"
            placeholderTextColor="#999"
            value={idade}
            onChangeText={setIdade}
          />

          <Text style={styles.label}>Dia de nascimento</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ex: 15"
            placeholderTextColor="#999"
            value={dia}
            onChangeText={setDia}
          />

          <Text style={styles.label}>Mês de nascimento</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ex: 8"
            placeholderTextColor="#999"
            value={mes}
            onChangeText={setMes}
          />

          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Ano de nascimento</Text>

            <Text style={styles.resultado}>{anoNascimento || "----"}</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2E47",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    elevation: 6,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#2D2E47",
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#2D2E47",
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f7f7f7",
  },

  resultBox: {
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#2F6C82",
    alignItems: "center",
  },

  resultLabel: {
    color: "#fff",
    fontSize: 16,
  },

  resultado: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
});
