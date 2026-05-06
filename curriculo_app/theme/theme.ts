import { MD3LightTheme } from "react-native-paper";

export const colors = {
  color1: "#6DA67A",
  color2: "#99A66D",
  color3: "#A9BD68",
  color4: "#B5CC6A",
  color5: "#C0DE5D",

  bg: "#F7F8E8",
  card: "#FFFFFF",
  card2: "#EEF2D1",
  border: "#D8E2A8",

  text: "#263026",
  muted: "#66705A",

  accent: "#6DA67A",
  accentStrong: "#99A66D",

  danger: "#B85C5C",
  dangerBg: "#F4DCDC",

  warning: "#B9892D",

  white: "#FFFFFF",
  black: "#263026",
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.accent,
    secondary: colors.accentStrong,
    background: colors.bg,
    surface: colors.card,
    onSurface: colors.text,
  },
};