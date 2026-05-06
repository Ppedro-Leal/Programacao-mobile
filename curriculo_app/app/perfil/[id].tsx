import { useEffect, useState } from "react";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Portal,
  Text,
} from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { getPessoaById, Pessoa } from "../../api/api";
import { colors } from "../../theme/theme";

import { CurriculoSection } from "../../components/CurriculoSection";
import { SectionHeader } from "../../components/SectionHeader";

import { TecnologiaModal } from "../../components/modals/TecnologiaModal";
import { AcademicaModal } from "../../components/modals/AcademicaModal";
import { ProfissionalModal } from "../../components/modals/ProfissionalModal";
import { ProjetoModal } from "../../components/modals/ProjetoModal";

import { usePerfilModals } from "../../hooks/usePerfilModals";

export default function Perfil() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [loading, setLoading] = useState(true);

  async function carregarPessoa() {
    try {
      const data = await getPessoaById(String(id));
      setPessoa(data);
    } catch (error) {
      console.log("Erro ao carregar perfil:", error);
    } finally {
      setLoading(false);
    }
  }

  const {
    modalTipo,
    editando,

    tecnologiaForm,
    setTecnologiaForm,
    academicaForm,
    setAcademicaForm,
    profissionalForm,
    setProfissionalForm,
    projetoForm,
    setProjetoForm,

    fecharModal,
    abrirModalTecnologia,
    abrirModalAcademica,
    abrirModalProfissional,
    abrirModalProjeto,

    salvarTecnologia,
    salvarAcademica,
    salvarProfissional,
    salvarProjeto,
    confirmarExcluir,
  } = usePerfilModals(pessoa, carregarPessoa);

  useEffect(() => {
    carregarPessoa();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  const initials = pessoa?.nome
    ?.split(" ")
    .slice(0, 2)
    .map((name: string) => name[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.profileBox}>
          <View style={styles.profileHeader}>
            <View style={styles.profileTop}>
              <View style={styles.profileInfo}>
                <Text style={styles.name}>{pessoa?.nome}</Text>
                <Text style={styles.role}>{pessoa?.cargo}</Text>

                <View style={styles.locationRow}>
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    size={14}
                    color={colors.muted}
                  />
                  <Text style={styles.muted}>Recife, PE</Text>
                </View>
              </View>
            </View>

            <Button
              mode="outlined"
              icon="pencil-outline"
              textColor={colors.text}
              style={styles.editButton}
              onPress={() => router.push(`/editar/${pessoa?.id}`)}
            >
              Editar
            </Button>
          </View>

          <Text style={styles.resume}>{pessoa?.resumo}</Text>

          <View style={styles.contactBox}>
            <Text style={styles.contactTitle}>Contato</Text>

            <View style={styles.contactRow}>
              <MaterialCommunityIcons
                name="email-outline"
                size={16}
                color={colors.accent}
              />
              <Text style={styles.contact}>{pessoa?.email}</Text>
            </View>

            {pessoa?.telefone ? (
              <View style={styles.contactRow}>
                <MaterialCommunityIcons
                  name="phone-outline"
                  size={16}
                  color={colors.accent}
                />
                <Text style={styles.contact}>{pessoa.telefone}</Text>
              </View>
            ) : null}

            {pessoa?.github ? (
              <View style={styles.contactRow}>
                <MaterialCommunityIcons
                  name="github"
                  size={16}
                  color={colors.accent}
                />
                <Text style={styles.contact}>{pessoa.github}</Text>
              </View>
            ) : null}

            {pessoa?.linkedin ? (
              <View style={styles.contactRow}>
                <MaterialCommunityIcons
                  name="linkedin"
                  size={16}
                  color={colors.accent}
                />
                <Text style={styles.contact}>{pessoa.linkedin}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.linkButtons}>
            {pessoa?.github ? (
              <Button
                mode="contained"
                buttonColor={colors.accent}
                textColor={colors.white}
                icon="github"
                onPress={() => Linking.openURL(pessoa.github!)}
              >
                GitHub
              </Button>
            ) : null}

            {pessoa?.linkedin ? (
              <Button
                mode="outlined"
                textColor={colors.text}
                icon="linkedin"
                style={styles.secondaryButton}
                onPress={() => Linking.openURL(pessoa.linkedin!)}
              >
                LinkedIn
              </Button>
            ) : null}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Seções do Currículo</Text>

        <SectionHeader
          title="Experiência Profissional"
          buttonLabel="Adicionar Experiência"
          onAdd={() => abrirModalProfissional()}
        />

        {pessoa?.ExperienciaProfissionals?.length ? (
          pessoa.ExperienciaProfissionals.map((item: any) => (
            <CurriculoSection
              key={item.id}
              icon="briefcase-outline"
              title={item.cargo}
              subtitle={`${item.empresa} • ${item.periodo}`}
              description={item.descricao}
              color={colors.accent}
              onEdit={() => abrirModalProfissional(item)}
              onDelete={() => confirmarExcluir("profissional", item.id)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>
            Nenhuma experiência profissional cadastrada.
          </Text>
        )}

        <SectionHeader
          title="Experiência Acadêmica"
          buttonLabel="Adicionar Experiência"
          onAdd={() => abrirModalAcademica()}
        />

        {pessoa?.ExperienciaAcademicas?.length ? (
          pessoa.ExperienciaAcademicas.map((item: any) => (
            <CurriculoSection
              key={item.id}
              icon="school-outline"
              title={item.curso}
              subtitle={`${item.instituicao} • ${item.periodo}`}
              description={item.descricao}
              color={colors.accentStrong}
              onEdit={() => abrirModalAcademica(item)}
              onDelete={() => confirmarExcluir("academica", item.id)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>
            Nenhuma experiência acadêmica cadastrada.
          </Text>
        )}

        <SectionHeader
          title="Habilidades"
          buttonLabel="Adicionar Habilidade"
          onAdd={() => abrirModalTecnologia()}
        />

        {pessoa?.Tecnologia?.length ? (
          <View style={styles.techContainer}>
            {pessoa.Tecnologia.map((tec: any) => (
              <View key={tec.id} style={styles.techChip}>
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={16}
                  color={colors.accent}
                />

                <Text style={styles.techChipText}>{tec.nome}</Text>

                <Button
                  compact
                  mode="text"
                  textColor={colors.accent}
                  onPress={() => abrirModalTecnologia(tec)}
                >
                  Editar
                </Button>

                <Button
                  compact
                  mode="text"
                  textColor={colors.danger}
                  onPress={() => confirmarExcluir("tecnologia", tec.id)}
                >
                  Excluir
                </Button>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>Nenhuma habilidade cadastrada.</Text>
        )}

        <SectionHeader
          title="Projetos"
          buttonLabel="Adicionar Projeto"
          onAdd={() => abrirModalProjeto()}
        />

        {pessoa?.Projetos?.length ? (
          pessoa.Projetos.map((item: any) => (
            <CurriculoSection
              key={item.id}
              icon="folder-outline"
              title={item.titulo}
              description={item.descricao}
              color={colors.accent}
              onEdit={() => abrirModalProjeto(item)}
              onDelete={() => confirmarExcluir("projeto", item.id)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhum projeto cadastrado.</Text>
        )}
      </ScrollView>

      <Portal>
        <TecnologiaModal
          visible={modalTipo === "tecnologia"}
          editando={editando}
          form={tecnologiaForm}
          setForm={setTecnologiaForm}
          onSave={salvarTecnologia}
          onClose={fecharModal}
        />

        <AcademicaModal
          visible={modalTipo === "academica"}
          editando={editando}
          form={academicaForm}
          setForm={setAcademicaForm}
          onSave={salvarAcademica}
          onClose={fecharModal}
        />

        <ProfissionalModal
          visible={modalTipo === "profissional"}
          editando={editando}
          form={profissionalForm}
          setForm={setProfissionalForm}
          onSave={salvarProfissional}
          onClose={fecharModal}
        />

        <ProjetoModal
          visible={modalTipo === "projeto"}
          editando={editando}
          form={projetoForm}
          setForm={setProjetoForm}
          onSave={salvarProjeto}
          onClose={fecharModal}
        />
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: 18,
    paddingBottom: 30,
  },
  profileBox: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  profileTop: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    flex: 1,
  },
  profileInfo: {
    flex: 1,
  },
  avatar: {
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarLabel: {
    color: colors.text,
    fontWeight: "bold",
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "bold",
  },
  role: {
    color: colors.accent,
    fontWeight: "bold",
    marginTop: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  muted: {
    color: colors.muted,
    marginLeft: 3,
    fontSize: 12,
  },
  editButton: {
    borderColor: colors.border,
    borderRadius: 12,
  },
  resume: {
    color: colors.muted,
    lineHeight: 21,
    marginTop: 18,
    marginBottom: 14,
  },
  contactBox: {
    marginTop: 8,
    backgroundColor: colors.card2,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactTitle: {
    color: colors.text,
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 15,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  contact: {
    color: colors.muted,
    flex: 1,
  },
  linkButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  secondaryButton: {
    borderColor: colors.border,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 14,
  },
  techContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  techChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  techChipText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "600",
  },
  emptyText: {
    color: colors.muted,
    marginBottom: 12,
    fontStyle: "italic",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bg,
  },
});
