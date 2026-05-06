import { StyleSheet, View } from "react-native";
import { Avatar, IconButton, Text, TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/theme";
import { Pessoa } from "../api/api";

type Props = {
  pessoa: Pessoa;
  onPress: () => void;
  onDelete: () => void;
};

export function ProfileListCard({ pessoa, onPress, onDelete }: Props) {

  return (
    <TouchableRipple onPress={onPress} borderless style={styles.card}>
      <View>
        <View style={styles.row}>
          <View style={styles.info}>
            <Text style={styles.name}>{pessoa.nome}</Text>
            <Text style={styles.role}>{pessoa.cargo}</Text>

            <View style={styles.locationRow}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={13}
                color={colors.muted}
              />
              <Text style={styles.muted}>Recife, PE</Text>
            </View>
          </View>

          <TouchableRipple
            onPress={onDelete}
            borderless
            style={styles.deleteAction}
          >
            <View style={styles.deleteContent}>
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={16}
                color={colors.danger}
              />
              <Text style={styles.deleteText}>Excluir</Text>
            </View>
          </TouchableRipple>
        </View>

        <View style={styles.footer}>
          <Text style={styles.viewText}>VER CURRÍCULO</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={22}
            color={colors.muted}
          />
        </View>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: colors.bg,
    marginRight: 12,
  },
  avatarLabel: {
    color: colors.text,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 16,
  },
  role: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
  muted: {
    color: colors.muted,
    fontSize: 12,
    marginLeft: 3,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  iconButton: {
    backgroundColor: "#123044",
    margin: 0,
  },
  deleteAction: {
    backgroundColor: colors.dangerBg,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  deleteContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  deleteText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "bold",
  },
});
