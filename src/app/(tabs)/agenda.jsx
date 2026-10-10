import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CardHorario } from "../../components/CardHorario";
import Header from "../../components/Header";

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
const FILTROS = ["Todas", "Basquete", "Futebol"];

// temporário: depois virá do back-end
const HORARIOS = [
  {
    id: 1,
    hora: "08:00",
    nome: "Quadra de Basquete",
    esporte: "Basquete",
    ocupado: false,
  },
  {
    id: 2,
    hora: "09:00",
    nome: "Quadra de Futebol",
    esporte: "Futebol",
    ocupado: true,
    observacao: "Reservado/Aula Técnica",
  },
  {
    id: 3,
    hora: "10:00",
    nome: "Quadra de Futsal",
    esporte: "Futsal",
    ocupado: false,
  },
  {
    id: 4,
    hora: "11:00",
    nome: "Quadra de Futebol",
    esporte: "Futebol",
    ocupado: false,
  },
];

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
  const [diaSelecionado, setDiaSelecionado] = useState(paraISO(hoje));
  const [filtro, setFiltro] = useState("Todas");

  const dataEscolhida = DIAS.find((d) => paraISO(d) === diaSelecionado) ?? hoje;
  const titulo = `${NOMES_DIA[dataEscolhida.getDay()]}, ${dataEscolhida.getDate()} de ${MESES[dataEscolhida.getMonth()]}`;

  // diaSelecionado (ex.: '2026-10-08') é o que vai para o back-end quando a agenda for ligada à API
  const horarios = HORARIOS.filter(
    (h) => filtro === "Todas" || h.esporte === filtro,
  );

  const abrirFiltros = () => {
    // TODO: abrir filtros avançados
  };

  const reservar = (horario) => {
    // TODO: criarReserva({ quadra, data: diaSelecionado, horario: horario.hora, ... })
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
          {FILTROS.map((nome) => {
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
          {horarios.map((h) => (
            <CardHorario
              key={h.id}
              hora={h.hora}
              nome={h.nome}
              ocupado={h.ocupado}
              observacao={h.observacao}
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
  filtros: { flexDirection: "row", gap: 8 },
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
});
