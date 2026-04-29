import { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Avatar,
  Button,
  Card,
  Chip,
  Divider,
  PaperProvider,
  ProgressBar,
  Switch,
  Text,
  TextInput,
  Appbar,
} from "react-native-paper";

const colors = {
  gray: "#5A5A55",
  text: "#2E2E2E",
  greenDark: "#76877D",
  green: "#88B8A9",
  greenLight: "#B2CBAE",
  cream: "#DBDDB4",
};

export default function Home() {
  const [nome, setNome] = useState("");
  const [ativo, setAtivo] = useState(false);
  const insets = useSafeAreaInsets();


  return (
    <PaperProvider>
      <Appbar.Header
        style={{
          backgroundColor: colors.greenDark,
          height:  10   + insets.top,
        }}
      >
        <Appbar.Content title="UI Kit Demo" color="white" />
      </Appbar.Header>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
        >
          <Text variant="headlineMedium" style={styles.title}>
            React Native Paper
          </Text>

          <Text style={styles.subtitle}>
            Demonstração dos principais componentes do UI Kit.
          </Text>

          <Card style={styles.card}>
            <Card.Title
              title="Mini Perfil"
              titleStyle={styles.cardTitle}
              subtitle="Card, Avatar e Botões"
              subtitleStyle={styles.cardSubtitle}
              left={(props) => (
                <Avatar.Text {...props} label="PL" style={styles.avatar} />
              )}
            />

            <Card.Content>
              <Text style={styles.cardText}>
                Desenvolvedor focado em criar aplicações modernas com React
                Native, Node.js e bancos de dados. Apaixonado por tecnologia.
              </Text>
            </Card.Content>

            <Card.Actions>
              <Button mode="contained" buttonColor={colors.greenDark}>
                Salvar
              </Button>
              <Button textColor={colors.greenDark}>Detalhes</Button>
            </Card.Actions>
          </Card>

          <Divider style={styles.divider} />

          <TextInput
            label="Digite seu nome"
            value={nome}
            onChangeText={setNome}
            mode="outlined"
            textColor={colors.text}
            outlineColor={colors.gray}
            activeOutlineColor={colors.greenDark}
            theme={{
              colors: {
                text: colors.text,
                placeholder: colors.gray,
                primary: colors.greenDark,
              },
            }}
            style={styles.input}
          />

          <View style={styles.switchBox}>
            <Text variant="titleMedium" style={{ color: colors.text }}>
              Notificações
            </Text>
            <Switch
              value={ativo}
              onValueChange={setAtivo}
              color={colors.greenDark}
            />
          </View>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Tecnologias
          </Text>

          <View style={styles.chips}>
            <Chip style={styles.chip}>React Native</Chip>
            <Chip style={styles.chip}>Expo</Chip>
            <Chip style={styles.chip}>Paper</Chip>
          </View>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Progresso do projeto
          </Text>

          <ProgressBar
            progress={0.75}
            color={colors.greenDark}
            style={styles.progress}
          />

          <Button
            mode="contained"
            buttonColor={colors.green}
            textColor="white"
            style={styles.button}
          >
            Botão principal
          </Button>

          <Button
            mode="outlined"
            textColor={colors.greenDark}
            style={styles.button}
          >
            Botão secundário
          </Button>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.greenDark,
  },
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    padding: 20,
  },
  title: {
    color: colors.greenDark,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: colors.gray,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: colors.green,
  },
  cardTitle: {
    color: colors.text,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: colors.gray,
  },
  cardText: {
    color: colors.text,
    marginTop: 5,
  },

  divider: {
    marginVertical: 16,
  },

  input: {
    backgroundColor: "#fff",
    marginBottom: 16,
  },

  switchBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    color: colors.greenDark,
    marginBottom: 8,
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    backgroundColor: colors.greenLight,
  },

  progress: {
    height: 8,
    borderRadius: 8,
    marginBottom: 20,
  },

  button: {
    marginBottom: 10,
  },
});
