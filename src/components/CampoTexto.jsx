import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";

export function CampoTexto({
  rotulo,
  icone,
  valor,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
}) {
  return (
    <View style={styles.grupo}>
      {rotulo && <Text style={styles.rotulo}>{rotulo}</Text>}
      <View style={styles.caixa}>
        <Ionicons name={icone} size={24} color="#9A9A9A" />
        <TextInput
          style={styles.input}
          value={valor}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#8A8A8A"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grupo: { gap: 8 },
  rotulo: { fontSize: 14, color: "#000" },
  caixa: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 56,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
  },
  input: { flex: 1, fontSize: 15, fontWeight: "600", color: "#333" },
});
