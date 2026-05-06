import { StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/theme";

type Props = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
  onPress: () => void;
};

export function ProfileSectionCard({ icon, title, description, onPress }: Props) {
  return (
    <TouchableRipple onPress={onPress} borderless style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons name={icon} size={24} color={colors.accent} />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <MaterialCommunityIcons name="chevron-right" size={28} color={colors.muted} />
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.card2,
    alignItems: "center",
    justifyContent: "center",
  },
  textBox: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 15,
  },
  description: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 3,
  },
});