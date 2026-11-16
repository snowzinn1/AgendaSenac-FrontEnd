import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function CampoSelect({
  rotulo,
  icone,
  placeholder,
  valor,
  opcoes,
  onChange,
}) {
  const [aberto, setAberto] = useState(false);

  const escolher = (opcao) => {
    onChange(opcao);
    setAberto(false);
  };

  return (
    <View style={styles.grupo}>
      <Text style={styles.rotulo}>{rotulo}</Text>

      <Pressable style={styles.caixa} onPress={() => setAberto(!aberto)}>
        <Ionicons name={icone} size={22} color="#284066" />
        <Text style={styles.valor}>{valor || placeholder}</Text>
        <Ionicons
          name={aberto ? "chevron-up" : "chevron-down"}
          size={20}
          color="#284066"
        />
      </Pressable>

      {aberto && (
        <View style={styles.lista}>
          {opcoes.map((opcao) => (
            <Pressable
              key={opcao}
              style={styles.opcao}
              onPress={() => escolher(opcao)}
            >
              <Text
                style={[
                  styles.opcaoTexto,
                  opcao === valor && styles.opcaoAtiva,
                ]}
              >
                {opcao}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
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
    backgroundColor: "#fff",
  },
  valor: { flex: 1, fontSize: 15, fontWeight: "700", color: "#284066" },
  lista: { backgroundColor: "#fff", borderRadius: 20, paddingVertical: 6 },
  opcao: { paddingVertical: 12, paddingHorizontal: 18 },
  opcaoTexto: { fontSize: 15, color: "#333" },
  opcaoAtiva: { color: "#284066", fontWeight: "700" },
});
