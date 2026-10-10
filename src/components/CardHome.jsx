import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function CardHome({
  icone,
  corFundo,
  corIcone,
  titulo,
  descricao,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
    >
      <View style={[styles.iconeBox, { backgroundColor: corFundo }]}>
        <Ionicons name={icone} size={20} color={corIcone} />
      </View>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.descricao}>{descricao}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 16,
    paddingBottom: 22,
  },
  iconeBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: { fontSize: 17, fontWeight: "700", color: "#000", marginTop: 20 },
  descricao: {
    fontSize: 11,
    fontWeight: "500",
    color: "#9A9A9A",
    marginTop: 6,
  },
});
