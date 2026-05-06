import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { colors, theme } from "../theme/theme";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

  return (
    <PaperProvider theme={theme}>
      <StatusBar style="dark" backgroundColor={colors.bg} />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "bold",
            color: colors.text,
          },
          contentStyle: {
            backgroundColor: colors.bg,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="perfil/[id]" options={{ title: "Perfil" }} />
        <Stack.Screen name="criar" options={{ title: "Novo Currículo" }} />
        <Stack.Screen
          name="editar/[id]"
          options={{ title: "Editar Currículo" }}
        />
        <Stack.Screen
          name="academica/[id]"
          options={{ title: "Experiência Acadêmica" }}
        />
        <Stack.Screen
          name="profissional/[id]"
          options={{ title: "Experiência Profissional" }}
        />
        <Stack.Screen name="projetos/[id]" options={{ title: "Projetos" }} />
        <Stack.Screen
          name="habilidades/[id]"
          options={{ title: "Habilidades" }}
        />
      </Stack>
    </PaperProvider>
  );
}
