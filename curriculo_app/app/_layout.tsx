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
      </Stack>
    </PaperProvider>
  );
}
