import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function ItemAjuda({
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
        <MaterialCommunityIcons name={icone} size={30} color={corIcone} />
      </View>
      <View style={styles.textos}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.descricao}>{descricao}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#555" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  iconeBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  textos: { 
    flex: 1 
  },
  titulo: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#000" 
  },
  descricao: {
    fontSize: 11,
    fontWeight: "500",
    color: "#9A9A9A",
    marginTop: 2,
  },
});
