import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CardHorario } from "../../components/CardHorario";
import Header from "../../components/Header";
import { useHorarios } from "../../hooks/useHorarios";
import { STATUS_HORARIO } from "../../Services/HorarioService";
import { formatarHora } from "../../Utils/formatadores";

const NOMES_DIA = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];
const SIGLAS_DIA = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
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
// Texto do card quando o horário não está disponível
const OBSERVACAO = {
  [STATUS_HORARIO.RESERVADO]: "Reservado",
  [STATUS_HORARIO.INDISPONIVEL]: "Indisponível",
};

// Monta os próximos 14 dias a partir de hoje
const hoje = new Date();
const DIAS = Array.from({ length: 14 }, (_, i) => {
  const dia = new Date(hoje);
  dia.setDate(hoje.getDate() + i);
  return dia;
});

// Data no formato do back-end (yyyy-MM-dd), usando o fuso local
function paraISO(data) {
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${data.getFullYear()}-${mes}-${dia}`;
}

export default function AgendaScreen() {
  const router = useRouter();
  const [diaSelecionado, setDiaSelecionado] = useState(paraISO(hoje));
  const [filtro, setFiltro] = useState("Todas");

  const { horarios, modalidades, carregando, erro, recarregar } = useHorarios(
    diaSelecionado,
    filtro,
  );
  const filtros = ["Todas", ...modalidades];

  const dataEscolhida = DIAS.find((d) => paraISO(d) === diaSelecionado) ?? hoje;
  const titulo = `${NOMES_DIA[dataEscolhida.getDay()]}, ${dataEscolhida.getDate()} de ${MESES[dataEscolhida.getMonth()]}`;

  const abrirFiltros = () => {
    // TODO: abrir filtros avançados
  };

  const reservar = (horario) => {
    router.push({
      pathname: "/DetalhesReserva",
      params: { horarioId: horario.id },
    });
  };

  return (
    <View style={styles.tela}>
      <Header
        titulo="Agenda de Quadras"
        direita={
          <Pressable
            style={styles.botaoFiltro}
            onPress={abrirFiltros}
            hitSlop={8}
          >
            <Ionicons name="options-outline" size={20} color="#555" />
          </Pressable>
        }
      />

      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.data}>{titulo}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dias}
        >
          {DIAS.map((dia) => {
            const ativo = paraISO(dia) === diaSelecionado;
            return (
              <Pressable
                key={paraISO(dia)}
                onPress={() => setDiaSelecionado(paraISO(dia))}
                style={[styles.dia, ativo && styles.diaAtivo]}
              >
                <Text style={[styles.diaSigla, ativo && styles.textoClaro]}>
                  {SIGLAS_DIA[dia.getDay()]}
                </Text>
                <Text style={[styles.diaNumero, ativo && styles.textoClaro]}>
                  {dia.getDate()}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.filtros}>
          {filtros.map((nome) => {
            const ativo = nome === filtro;
            return (
              <Pressable
                key={nome}
                onPress={() => setFiltro(nome)}
                style={[styles.chip, ativo && styles.chipAtivo]}
              >
                <Text style={[styles.chipTexto, ativo && styles.textoClaro]}>
                  {nome}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.lista}>
          {carregando && <ActivityIndicator color="#284066" />}

          {erro && (
            <Pressable onPress={recarregar}>
              <Text style={styles.erro}>{erro} Toque para tentar de novo.</Text>
            </Pressable>
          )}

          {!carregando && !erro && horarios.length === 0 && (
            <Text style={styles.vazio}>Nenhum horário para este dia.</Text>
          )}

          {horarios.map((h) => (
            <CardHorario
              key={h.id}
              hora={formatarHora(h.horaInicio)}
              nome={h.quadra.nome}
              ocupado={h.status !== STATUS_HORARIO.DISPONIVEL}
              observacao={OBSERVACAO[h.status]}
              onReservar={() => reservar(h)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#E5E5E5" },
  conteudo: { padding: 20, paddingBottom: 130 },
  botaoFiltro: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },
  data: { fontSize: 20, fontWeight: "700", color: "#777", textAlign: "center" },
  dias: { gap: 12, paddingVertical: 20 },
  dia: {
    width: 60,
    height: 74,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  diaAtivo: { backgroundColor: "#284066" },
  diaSigla: { fontSize: 12, fontWeight: "700", color: "#9A9A9A" },
  diaNumero: { fontSize: 22, fontWeight: "800", color: "#000" },
  textoClaro: { color: "#fff" },
  filtros: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D0D0D0",
  },
  chipAtivo: { backgroundColor: "#284066", borderColor: "#284066" },
  chipTexto: { fontSize: 13, fontWeight: "700", color: "#284066" },
  lista: { gap: 16, marginTop: 20 },
  erro: { color: "#E53935", fontSize: 14, textAlign: "center" },
  vazio: { textAlign: "center", color: "#9A9A9A", fontSize: 15, marginTop: 12 },
});
