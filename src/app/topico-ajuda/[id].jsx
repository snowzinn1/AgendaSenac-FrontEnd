// SCREEN: conteúdo de um tópico da Central de Ajuda. O id vem da rota: /topico-ajuda/erro-reserva
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/Header";

const TOPICOS = {
  "erro-reserva": {
    titulo: "Erro ao reservar",
    icone: "alert-octagon",
    corFundo: "#FF9A9A",
    corIcone: "#E53935",
    resumo:
      "Se a reserva falhou, confira os pontos abaixo antes de tentar novamente.",
    passos: [
      "Verifique sua conexão com a internet.",
      "Confirme se o horário ainda está disponível: outra pessoa pode ter reservado antes.",
      "Veja se você já não tem uma reserva no mesmo horário.",
      "Feche e abra o app e tente de novo.",
    ],
  },
  "cancelar-agendamento": {
    titulo: "Cancelar Agendamento",
    icone: "calendar-remove-outline",
    corFundo: "#B0B9C7",
    corIcone: "#284066",
    resumo:
      "Você pode cancelar uma reserva pela aba de reservas, respeitando o prazo.",
    passos: [
      "Abra a aba de reservas (ícone de lista).",
      "Toque na reserva que deseja cancelar.",
      "Confirme o cancelamento.",
      "O horário volta a ficar disponível para outras pessoas.",
    ],
  },
  "acesso-quadras": {
    titulo: "Acesso às Quadras",
    icone: "key",
    corFundo: "#FF9A5C",
    corIcone: "#E8590C",
    resumo: "O acesso à quadra é feito por check-in no horário reservado.",
    passos: [
      "Chegue até 10 minutos antes do horário reservado.",
      "Apresente sua reserva ao responsável pela quadra.",
      "Faça o check-in e aproveite o horário.",
      "Ao terminar, deixe o espaço organizado.",
    ],
  },
};

export default function TopicoAjudaScreen() {
  const { id } = useLocalSearchParams();
  const topico = TOPICOS[id];

  const abrirEmail = () => {
    Linking.openURL(
      `mailto:suporte@senac.br?subject=Ajuda - ${topico.titulo}`,
    ).catch(() =>
      Alert.alert("Erro", "Não foi possível abrir o aplicativo de e-mail."),
    );
  };

  if (!topico) {
    return (
      <View style={styles.tela}>
        <Header titulo="Ajuda" />
        <Text style={styles.naoEncontrado}>Tópico não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.tela}>
      <Header titulo={topico.titulo} />

      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={[styles.iconeBox, { backgroundColor: topico.corFundo }]}>
          <MaterialCommunityIcons
            name={topico.icone}
            size={44}
            color={topico.corIcone}
          />
        </View>
        <Text style={styles.titulo}>{topico.titulo}</Text>
        <Text style={styles.resumo}>{topico.resumo}</Text>

        <View style={styles.card}>
          {topico.passos.map((passo, i) => (
            <View key={i} style={styles.passo}>
              <View style={styles.numero}>
                <Text style={styles.numeroTexto}>{i + 1}</Text>
              </View>
              <Text style={styles.passoTexto}>{passo}</Text>
            </View>
          ))}
        </View>

        <View style={styles.suporte}>
          <Text style={styles.suporteTitulo}>Não resolveu?</Text>
          <Pressable
            onPress={abrirEmail}
            style={({ pressed }) => [styles.chat, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.chatTexto}>Enviar e-mail ao suporte</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#E5E5E5" },
  conteudo: { padding: 20, paddingBottom: 40 },
  naoEncontrado: { textAlign: "center", marginTop: 40, color: "#A0A0A0" },
  iconeBox: {
    width: 88,
    height: 88,
    borderRadius: 24,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
  },
  resumo: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    gap: 18,
    marginTop: 24,
  },
  passo: { flexDirection: "row", alignItems: "center", gap: 14 },
  numero: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#284066",
    alignItems: "center",
    justifyContent: "center",
  },
  numeroTexto: { color: "#fff", fontWeight: "700" },
  passoTexto: { flex: 1, fontSize: 15, color: "#222" },
  suporte: {
    backgroundColor: "#284066",
    borderRadius: 20,
    padding: 20,
    marginTop: 24,
    alignItems: "center",
    gap: 12,
  },
  suporteTitulo: { fontSize: 18, fontWeight: "700", color: "#fff" },
  chat: {
    backgroundColor: "#142B4D",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  chatTexto: { fontSize: 14, fontWeight: "700", color: "#fff" },
});
