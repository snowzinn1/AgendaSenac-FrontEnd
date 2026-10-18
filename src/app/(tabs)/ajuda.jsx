import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Header from "../../components/Header";
import { ItemAjuda } from "../../components/ItemAjuda";

const PROBLEMAS = [
  {
    id: "erro-reserva",
    icone: "alert-octagon",
    corFundo: "#FF9A9A",
    corIcone: "#E53935",
    titulo: "Erro ao reservar",
    descricao: "O que fazer quando a reserva falha",
  },
  {
    id: "cancelar-agendamento",
    icone: "calendar-remove-outline",
    corFundo: "#B0B9C7",
    corIcone: "#284066",
    titulo: "Cancelar Agendamento",
    descricao: "Regras e prazos para cancelamento",
  },
  {
    id: "acesso-quadras",
    icone: "key",
    corFundo: "#FF9A5C",
    corIcone: "#E8590C",
    titulo: "Acesso às Quadras",
    descricao: "Como funciona o check-in",
  },
];

export default function AjudaScreen() {
  const router = useRouter();
  const [busca, setBusca] = useState("");

  const filtrados = PROBLEMAS.filter((p) =>
    `${p.titulo} ${p.descricao}`.toLowerCase().includes(busca.toLowerCase()),
  );

  const abrirProblema = (problema) => {
    router.push(`/topico-ajuda/${problema.id}`);
  };

  const abrirEmail = () => {
    Linking.openURL(
      "mailto:suporte@senac.br?subject=Ajuda - Agenda Senac",
    ).catch(() =>
      Alert.alert("Erro", "Não foi possível abrir o aplicativo de e-mail."),
    );
  };

  return (
    <View style={styles.tela}>
      <Header titulo="Central de Ajuda" />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.avatar}>
          <Ionicons name="headset" size={80} color="#284066" />
        </View>
        <Text style={styles.titulo}>Como podemos ajudar?</Text>
        <Text style={styles.subtitulo}>
          Encontre respostas rápidas ou fale com nossa equipe de suporte
        </Text>

        <View style={styles.busca}>
          <Ionicons name="search" size={24} color="#9A9A9A" />
          <TextInput
            style={styles.buscaInput}
            value={busca}
            onChangeText={setBusca}
            placeholder="Descreva seu problema..."
            placeholderTextColor="#8A8A8A"
          />
        </View>

        <Text style={styles.secao}>PROBLEMAS COMUNS</Text>
        <View style={styles.lista}>
          {filtrados.map((p) => (
            <ItemAjuda
              key={p.id}
              icone={p.icone}
              corFundo={p.corFundo}
              corIcone={p.corIcone}
              titulo={p.titulo}
              descricao={p.descricao}
              onPress={() => abrirProblema(p)}
            />
          ))}
        </View>

        <View style={styles.suporte}>
          <Text style={styles.suporteTitulo}>Ainda precisa de ajuda?</Text>
          <Text style={styles.suporteTexto}>
            Nossa equipe está disponível de segunda a sexta, das 08:00 às 20:00.
          </Text>
          <Pressable
            onPress={abrirEmail}
            style={({ pressed }) => [styles.chat, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.chatTexto}>Chat</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#E5E5E5" },
  conteudo: { padding: 20, paddingBottom: 130 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#9AA7B8",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
  },
  subtitulo: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9A9A9A",
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 40,
  },
  busca: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 56,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginTop: 24,
  },
  buscaInput: { flex: 1, fontSize: 14, fontWeight: "600", color: "#333" },
  secao: {
    fontSize: 14,
    fontWeight: "600",
    color: "#A0A0A0",
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 4,
  },
  lista: { gap: 16 },
  suporte: {
    backgroundColor: "#284066",
    borderRadius: 20,
    padding: 20,
    marginTop: 24,
  },
  suporteTitulo: { fontSize: 20, fontWeight: "700", color: "#fff" },
  suporteTexto: { fontSize: 13, color: "#6F8AB3", marginTop: 8 },
  chat: {
    alignSelf: "center",
    marginTop: 16,
    backgroundColor: "#142B4D",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 40,
  },
  chatTexto: { fontSize: 14, fontWeight: "700", color: "#fff" },
});
