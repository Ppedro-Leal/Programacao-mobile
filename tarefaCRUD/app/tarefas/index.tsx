import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adicionarTarefa,
  atualizarTarefa,
  deletarTarefa,
  getTarefas,
} from "@/api";

type Tarefa = {
  objectId: string;
  descricao: string;
  concluida: boolean;
};

export default function TarefasPage() {
  const queryClient = useQueryClient();

  const [descricao, setDescricao] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null);
  const [novaDescricao, setNovaDescricao] = useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas,
  });

  const adicionarMutation = useMutation({
    mutationFn: adicionarTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      setDescricao("");
    },
    onError: () => {
      Alert.alert("Erro", "Não foi possível adicionar a tarefa.");
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: ({
      objectId,
      concluida,
      descricao,
    }: {
      objectId: string;
      concluida?: boolean;
      descricao?: string;
    }) => atualizarTarefa(objectId, { concluida, descricao }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      setModalVisible(false);
      setTarefaEditando(null);
      setNovaDescricao("");
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
      descricao: descricao.trim(),
      concluida: false,
    });
  }

  function handleToggleConcluida(objectId: string, valorAtual: boolean) {
    atualizarMutation.mutate({
      objectId,
      concluida: !valorAtual,
    });
  }

  function handleDelete(objectId: string) {
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

  function abrirModalEdicao(tarefa: Tarefa) {
    setTarefaEditando(tarefa);
    setNovaDescricao(tarefa.descricao);
    setModalVisible(true);
  }

  function salvarEdicao() {
    if (!tarefaEditando) return;

    if (novaDescricao.trim() === "") {
      Alert.alert("Erro", "A descrição não pode ficar vazia.");
      return;
    }

    atualizarMutation.mutate({
      objectId: tarefaEditando.objectId,
      descricao: novaDescricao.trim(),
    });
  }

  const carregando =
    isFetching ||
    adicionarMutation.isPending ||
    atualizarMutation.isPending ||
    deletarMutation.isPending;

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Minhas Tarefas</Text>
            <Text style={styles.subtitle}>
              Organize sua rotina de forma simples
            </Text>
          </View>

          <View style={styles.formCard}>

            <TextInput
              style={styles.input}
              placeholder="Digite a descrição da tarefa"
              placeholderTextColor="#566981"
              value={descricao}
              onChangeText={setDescricao}
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAdicionarTarefaPress}
              disabled={adicionarMutation.isPending}
            >
              <Feather name="plus-circle" size={18} color="#CBDAD5" />
              <Text style={styles.addButtonText}>Adicionar tarefa</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lista de tarefas</Text>
            {carregando && <ActivityIndicator size="small" color="#3A415A" />}
          </View>

          <View style={styles.tasksContainer}>
            {data?.map((t: Tarefa) => (
              <View key={t.objectId} style={styles.taskItem}>
                <View style={styles.taskTop}>
                  <View style={styles.taskTextContainer}>
                    <Text
                      style={[
                        styles.taskText,
                        t.concluida && styles.strikethroughText,
                      ]}
                    >
                      {t.descricao}
                    </Text>

                    <Text style={styles.statusText}>
                      {t.concluida ? "Concluída" : "Pendente"}
                    </Text>
                  </View>

                  <Switch
                    trackColor={{ false: "#89A7B1", true: "#89A7B1" }}
                    thumbColor={t.concluida ? "#CBDAD5" : "#F4F4F4"}
                    value={t.concluida}
                    onValueChange={() =>
                      handleToggleConcluida(t.objectId, t.concluida)
                    }
                  />
                </View>

                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => abrirModalEdicao(t)}
                  >
                    <Feather name="edit-2" size={16} color="#CBDAD5" />
                    <Text style={styles.actionButtonText}>Alterar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(t.objectId)}
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={18}
                      color="#fff"
                    />
                    <Text style={styles.actionButtonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {!data?.length && !carregando && (
              <View style={styles.emptyState}>
                <Feather name="clipboard" size={42} color="#566981" />
                <Text style={styles.emptyTitle}>Nenhuma tarefa cadastrada</Text>
                <Text style={styles.emptyText}>
                  Adicione sua primeira tarefa para começar.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Editar tarefa</Text>

            <TextInput
              style={styles.modalInput}
              value={novaDescricao}
              onChangeText={setNovaDescricao}
              placeholder="Digite a nova descrição"
              placeholderTextColor="#566981"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={salvarEdicao}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#CBDAD5",
  },
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#CBDAD5",
  },
  header: {
    marginTop: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#34344E",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#566981",
  },
  formCard: {
  backgroundColor: "#89A7B1",
  borderRadius: 18,
  padding: 16,
  boxShadow: "0px 4px 8px rgba(52, 52, 78, 0.2)",
},
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#34344E",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#CBDAD5",
    borderWidth: 1,
    borderColor: "#566981",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#34344E",
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: "#3A415A",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  addButtonText: {
    color: "#CBDAD5",
    fontWeight: "700",
    fontSize: 15,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#34344E",
  },
  tasksContainer: {
    marginTop: 4,
  },
  taskItem: {
  backgroundColor: "#566981",
  borderRadius: 18,
  padding: 16,
  marginBottom: 14,
  boxShadow: "0px 4px 10px rgba(52, 52, 78, 0.25)",
  elevation: 4, 
},
  taskTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  taskText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  strikethroughText: {
    textDecorationLine: "line-through",
    opacity: 0.7,
  },
  statusText: {
    marginTop: 6,
    fontSize: 12,
    color: "#CBDAD5",
    fontWeight: "600",
  },
  actionsRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#3A415A",
    borderRadius: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#34344E",
    borderRadius: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  emptyState: {
    marginTop: 30,
    backgroundColor: "#89A7B1",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "800",
    color: "#34344E",
  },
  emptyText: {
    marginTop: 6,
    fontSize: 14,
    textAlign: "center",
    color: "#3A415A",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 78, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    backgroundColor: "#CBDAD5",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#34344E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#34344E",
    marginBottom: 14,
  },
  modalInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#89A7B1",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#34344E",
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#89A7B1",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#34344E",
    fontWeight: "700",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#3A415A",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#CBDAD5",
    fontWeight: "700",
  },
});