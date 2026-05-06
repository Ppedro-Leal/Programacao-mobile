import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/theme";

type Props = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  subtitle?: string;
  description?: string;
  color?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function CurriculoSection({
  icon,
  title,
  subtitle,
  description,
  color = colors.accent,
  onEdit,
  onDelete,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: colors.card2 }]}>
        <MaterialCommunityIcons name={icon} size={24} color={color} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.textArea}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>

          <View style={styles.actions}>
            {onEdit ? (
              <IconButton
                icon="pencil-outline"
                size={18}
                iconColor={colors.accent}
                style={styles.actionButton}
                onPress={onEdit}
              />
            ) : null}

            {onDelete ? (
              <IconButton
                icon="trash-can-outline"
                size={18}
                iconColor={colors.danger}
                style={styles.deleteButton}
                onPress={onDelete}
              />
            ) : null}
          </View>
        </View>

        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    gap: 14,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  textArea: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 15,
  },
  subtitle: {
    color: colors.accent,
    fontSize: 12,
    marginTop: 3,
    fontWeight: "700",
  },
  description: {
    color: colors.muted,
    marginTop: 8,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -8,
    marginRight: -8,
  },
  actionButton: {
    margin: 0,
    backgroundColor: colors.card2,
  },
  deleteButton: {
    margin: 0,
    backgroundColor: colors.dangerBg,
  },
});