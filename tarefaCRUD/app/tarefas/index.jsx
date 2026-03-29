import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adicionarTarefa,
  atualizarTarefa,
  deletarTarefa,
  getTarefas,
} from "@/back4app";

export default function TarefasPage() {
  const queryClient = useQueryClient();
  const [descricao, setDescricao] = useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas,
  });

  const adicionarMutation = useMutation({
    mutationFn: adicionarTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
    onError: () => {
      Alert.alert("Erro", "Não foi possível adicionar a tarefa.");
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: ({ objectId, concluida }) =>
      atualizarTarefa(objectId, { concluida }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
    onError: () => {
      Alert.alert("Erro", "Não foi possível atualizar a tarefa.");
    },
  });

  const deletarMutation = useMutation({
    mutationFn: deletarTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
    onError: () => {
      Alert.alert("Erro", "Não foi possível deletar a tarefa.");
    },
  });

  function handleAdicionarTarefaPress() {
    if (descricao.trim() === "") {
      Alert.alert("Descrição inválida", "Preencha a descrição da tarefa");
      return;
    }

    adicionarMutation.mutate({
      descricao,
      concluida: false,
    });
    setDescricao("");
  }

  function handleToggleConcluida(objectId, valorAtual) {
    atualizarMutation.mutate({
      objectId,
      concluida: !valorAtual,
    });
  }

  function handleDelete(objectId) {
    Alert.alert(
      "Excluir tarefa",
      "Tem certeza que deseja excluir esta tarefa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deletarMutation.mutate(objectId),
        },
      ]
    );
  }

  const carregando =
    isFetching ||
    adicionarMutation.isPending ||
    atualizarMutation.isPending ||
    deletarMutation.isPending;

  return (
    <View style={styles.container}>
      {carregando && <ActivityIndicator size="large" />}

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Button
        title="Adicionar Tarefa"
        onPress={handleAdicionarTarefaPress}
        disabled={adicionarMutation.isPending}
      />

      <View style={styles.hr} />

      <View style={styles.tasksContainer}>
        {data?.map((t) => (
          <View key={t.objectId} style={styles.taskItem}>
            <View style={styles.taskRow}>
              <Text style={[styles.taskText, t.concluida && styles.strikethroughText]}>
                {t.descricao}
              </Text>

              <Switch
                value={t.concluida}
                onValueChange={() =>
                  handleToggleConcluida(t.objectId, t.concluida)
                }
              />
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(t.objectId)}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tasksContainer: {
    marginTop: 10,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
  hr: {
    height: 1,
    backgroundColor: "black",
    width: "100%",
    marginVertical: 10,
  },
  taskItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskText: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  strikethroughText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textDecorationColor: "red",
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#d9534f",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});