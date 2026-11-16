import { Pressable, StyleSheet, Text, View } from "react-native";

export function CardHorario({
  hora,
  nome,
  ocupado = false,
  observacao,
  onReservar,
}) {
  return (
    <View style={[styles.card, ocupado && styles.cardOcupado]}>
      <View style={styles.horaBox}>
        <Text style={[styles.hora, ocupado && styles.textoApagado]}>
          {hora}
        </Text>
      </View>

      <View style={styles.textos}>
        <Text style={[styles.nome, ocupado && styles.textoApagado]}>
          {nome}
        </Text>
        {ocupado ? (
          <Text style={styles.observacao}>{observacao}</Text>
        ) : (
          <View style={styles.statusLinha}>
            <View style={styles.bolinha} />
            <Text style={styles.statusTexto}>Disponível</Text>
          </View>
        )}
      </View>

      {ocupado ? (
        <Text style={styles.ocupado}>Ocupado</Text>
      ) : (
        <Pressable
          onPress={onReservar}
          style={({ pressed }) => [styles.botao, pressed && { opacity: 0.85 }]}
        >
          <Text style={styles.botaoTexto}>Reservar</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  cardOcupado: { backgroundColor: "#CFCFCF", borderColor: "#C2C2C2" },
  horaBox: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: "#B0B9C7",
    alignItems: "center",
    justifyContent: "center",
  },
  hora: { fontSize: 14, fontWeight: "700", color: "#284066" },
  textos: { flex: 1 },
  nome: { fontSize: 16, fontWeight: "700", color: "#000" },
  textoApagado: { color: "#7A7A7A" },
  statusLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  bolinha: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#22C55E" },
  statusTexto: { fontSize: 10, fontWeight: "600", color: "#22C55E" },
  observacao: {
    fontSize: 10,
    fontWeight: "600",
    color: "#7A7A7A",
    marginTop: 2,
  },
  ocupado: { fontSize: 12, fontWeight: "700", color: "#7A7A7A" },
  botao: {
    backgroundColor: "#FF6B1A",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  botaoTexto: { fontSize: 12, fontWeight: "700", color: "#fff" },
});
