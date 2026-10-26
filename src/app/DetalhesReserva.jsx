// SCREEN: Detalhes da Reserva. Recebe ?horarioId=... na rota.
import { Ionicons } from '@expo/vector-icons';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import {
  ActivityIndicator, KeyboardAvoidingView, Platform,
  Pressable, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { FotoQuadra } from '../components/FotoQuadra';
import Header from '../components/Header';
import { ParticipanteCard } from '../components/ParticipanteCard';
import { useSessao } from '../Config/sessao';
import { useDetalhesReserva } from '../hooks/useDetalhesReserva';
import useUsuario from '../hooks/useUsuario';
import { ocultarCpf } from '../Utils/cpf';
import { formatarData, formatarHora } from '../Utils/formatadores';


export default function DetalhesReserva() {
  const router = useRouter();
  const { horarioId } = useLocalSearchParams();

  const { usuario: sessao } = useSessao();
  const { usuario } = useUsuario(sessao?.id, sessao?.tipoUsuario);
  const {
    horario, carregando, erro, recarregar,
    participantes, adicionar, remover, atualizar,
    enviando, erroEnvio, confirmar,
  } = useDetalhesReserva(horarioId, sessao?.id);

  const aoConfirmar = async () => {
    const criou = await confirmar();
    if (criou) router.replace('/reservas'); // vai para Meus Agendamentos
  };

  // Sem login, volta para a tela de login
  if (!sessao) return <Redirect href="/" />;

  if (carregando || erro) {
    return (
      <View style={styles.tela}>
        <Header titulo="Detalhes da Reserva" />
        <View style={styles.centro}>
          {carregando ? (
            <ActivityIndicator color="#284066" />
          ) : (
            <Pressable onPress={recarregar}>
              <Text style={styles.erro}>{erro} Toque para tentar de novo.</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  const { quadra } = horario;

  return (
    <View style={styles.tela}>
      <Header titulo="Detalhes da Reserva" />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
          {/* Card da quadra */}
          <View style={styles.cardQuadra}>
            <FotoQuadra foto={quadra.foto} style={styles.foto} />
            <View style={styles.quadraCorpo}>
              <View style={styles.linhaNome}>
                <Text style={styles.nomeQuadra}>{quadra.nome}</Text>
                <View style={styles.tag}>
                  <Text style={styles.tagTexto}>Disponível</Text>
                </View>
              </View>
              <View style={styles.linhaLocal}>
                <Ionicons name="location-sharp" size={16} color="#9A9A9A" />
                <Text style={styles.local}>{quadra.localizacao}</Text>
              </View>

              <View style={styles.divisor} />

              <View style={styles.linhaData}>
                <Ionicons name="calendar" size={20} color="#284066" />
                <Text style={styles.data}>{formatarData(horario.data)}</Text>
              </View>

              <View style={styles.horarios}>
                <View style={styles.horarioBloco}>
                  <Text style={styles.rotuloPequeno}>INÍCIO</Text>
                  <View style={styles.pilula}>
                    <Ionicons name="time-outline" size={16} color="#284066" />
                    <Text style={styles.pilulaTexto}>{formatarHora(horario.horaInicio)}</Text>
                  </View>
                </View>
                <View style={styles.horarioBloco}>
                  <Text style={styles.rotuloPequeno}>TÉRMINO</Text>
                  <View style={styles.pilula}>
                    <Ionicons name="time-outline" size={16} color="#284066" />
                    <Text style={styles.pilulaTexto}>{formatarHora(horario.horaFim)}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.secao}>Participantes</Text>

          <View style={styles.listaParticipantes}>
            <ParticipanteCard
              titulo="RESPONSÁVEL (VOCÊ)"
              destaque
              somenteLeitura
              nome={usuario?.nome ?? ''}
              cpf={ocultarCpf(usuario?.cpf)}
            />

            {participantes.map((p, indice) => (
              <ParticipanteCard
                key={p.chave}
                titulo={`PARTICIPANTE ${indice + 2}`}
                nome={p.nome}
                cpf={p.cpf}
                onChangeNome={(v) => atualizar(p.chave, 'nome', v)}
                onChangeCpf={(v) => atualizar(p.chave, 'cpf', v)}
                onRemover={() => remover(p.chave)}
              />
            ))}
          </View>

          <Pressable style={styles.adicionar} onPress={adicionar}>
            <Ionicons name="add-circle" size={24} color="#A0A0A0" />
            <Text style={styles.adicionarTexto}>Adicionar Participante</Text>
          </Pressable>

          {erroEnvio && <Text style={styles.erro}>{erroEnvio}</Text>}

          <Pressable
            style={[styles.confirmar, enviando && { opacity: 0.6 }]}
            onPress={aoConfirmar}
            disabled={enviando}
          >
            {enviando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.confirmarTexto}>Confirmar Agendamento</Text>
            )}
          </Pressable>

          <Text style={styles.aviso}>
            AO CONFIRMAR, TODOS OS PARTICIPANTES DECLARAM ESTAR CIENTES DAS NORMAS DE USO
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#E5E5E5' },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  conteudo: { padding: 20, paddingBottom: 60 },
  erro: { color: '#E53935', fontSize: 14, textAlign: 'center', marginBottom: 12 },

  cardQuadra: { backgroundColor: '#fff', borderRadius: 28, overflow: 'hidden' },
  foto: { width: '100%', height: 150 },
  quadraCorpo: { padding: 20, gap: 8 },
  linhaNome: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  nomeQuadra: { fontSize: 20, fontWeight: '800', color: '#000', flexShrink: 1 },
  tag: { backgroundColor: '#FAD3BC', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 3 },
  tagTexto: { fontSize: 11, fontWeight: '700', color: '#F07F4A' },
  linhaLocal: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  local: { fontSize: 12, fontWeight: '600', color: '#9A9A9A', flex: 1 },
  divisor: { height: 1, backgroundColor: '#E5E5E5', marginVertical: 6 },
  linhaData: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  data: { fontSize: 13, fontWeight: '700', color: '#284066' },
  horarios: { flexDirection: 'row', gap: 16, marginTop: 6 },
  horarioBloco: { flex: 1, gap: 4 },
  rotuloPequeno: { fontSize: 11, fontWeight: '700', color: '#666' },
  pilula: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#E2E2E2', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8,
  },
  pilulaTexto: { fontSize: 13, fontWeight: '700', color: '#000' },

  secao: { fontSize: 22, fontWeight: '800', color: '#000', marginTop: 28, marginBottom: 14, marginLeft: 8 },
  listaParticipantes: { gap: 20 },

  adicionar: {
    marginTop: 24, height: 60, borderRadius: 24, borderWidth: 2, borderStyle: 'dashed',
    borderColor: '#C8C8C8', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  adicionarTexto: { fontSize: 15, fontWeight: '700', color: '#A0A0A0' },

  confirmar: {
    marginTop: 24, height: 56, borderRadius: 14, backgroundColor: '#284066',
    alignItems: 'center', justifyContent: 'center',
  },
  confirmarTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
  aviso: {
    marginTop: 18, paddingHorizontal: 16, textAlign: 'center',
    fontSize: 12, fontWeight: '700', color: '#7A7A7A', lineHeight: 18,
  },
});