import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { colors } from "../theme/theme";

type Props = {
  title: string;
  buttonLabel: string;
  onAdd: () => void;
};

export function SectionHeader({
  title,
  buttonLabel,
  onAdd,
}: Props) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.groupTitle}>{title}</Text>

      <Button
        mode="contained-tonal"
        icon="plus"
        compact
        buttonColor={colors.card2}
        textColor={colors.text}
        onPress={onAdd}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        {buttonLabel}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: 14,
    marginBottom: 12,
  },

  groupTitle: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 14,
  },

  button: {
    borderRadius: 14,
  },

  buttonLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
});