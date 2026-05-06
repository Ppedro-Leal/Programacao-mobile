import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { colors } from "../theme/theme";

type Props = {
  title: string;
  subtitle?: string;
  description?: string;
};

export function SectionCard({ title, subtitle, description }: Props) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>

        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

        {description && <Text style={styles.description}>{description}</Text>}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
    borderRadius: 18,
    backgroundColor: colors.white,
    elevation: 3,
  },
  title: {
    color: colors.bg,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.bg,
    marginTop: 4,
    fontWeight: "600",
  },
  description: {
    color: colors.black,
    marginTop: 8,
    lineHeight: 21,
  },
});