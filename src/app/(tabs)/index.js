import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CardHome } from "../../components/CardHome";
import Header from "../../components/Header";
import { useUsuario } from "../../hooks/useUsuario";

const NOMES_DIA = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];
const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export default function Home() {
  const router = useRouter();
  const USUARIO_ID = 1; // temporário: depois virá do login
  const { usuario } = useUsuario(USUARIO_ID);

  const hoje = new Date();
  const data = `${NOMES_DIA[hoje.getDay()]}, ${hoje.getDate()} de ${MESES[hoje.getMonth()]}`;
  const primeiroNome = usuario?.nome?.split(" ")[0] ?? "Usuário";

  return (
    <View style={styles.tela}>
      <Header
        titulo="Agenda Senac"
        direita={
          <Pressable
            style={styles.perfil}
            onPress={() => router.push("/perfil")}
            hitSlop={8}
          >
            <Ionicons name="person" size={20} color="#888" />
          </Pressable>
        }
      />

      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.data}>{data}</Text>
        <Text style={styles.saudacao}>Olá, {primeiroNome}</Text>

        <View style={styles.cards}>
          <CardHome
            icone="calendar"
            corFundo="#FFCDB0"
            corIcone="#FF6B1A"
            titulo="Ver Agenda"
            descricao="Confira os dias e horários disponíveis"
            onPress={() => router.push("/agenda")}
          />
          <CardHome
            icone="list"
            corFundo="#B0B9C7"
            corIcone="#284066"
            titulo="Meus Agendamentos"
            descricao="2 reservas ativas esta semana" // TODO: contar com listarReservas()
            onPress={() => router.push("/reservas")}
          />
          <CardHome
            icone="help-circle-outline"
            corFundo="#E0E0E0"
            corIcone="#888"
            titulo="Suporte"
            descricao="Fale com o suporte em caso de problema"
            onPress={() => router.push("/ajuda")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#E5E5E5" },
  conteudo: { padding: 22, paddingBottom: 130 },
  perfil: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },
  data: { fontSize: 14, fontWeight: "600", color: "#9A9A9A", marginTop: 10 },
  saudacao: { fontSize: 32, fontWeight: "800", color: "#000", marginTop: 8 },
  cards: { gap: 28, marginTop: 28 },
});
