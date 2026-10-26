// COMPONENT: card de um agendamento (foto, nome, tag, local, data, horário e botão Cancelar).
// Recebe tudo por props: não sabe nada de API. O check-in é automático no back, não há botão.
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatarData, formatarHora } from '../Utils/formatadores';
import { FotoQuadra } from './FotoQuadra';

export function ReservaCard({ reserva, tag = 'Confirmado', ocupado = false, onCancelar }) {
  const { horario } = reserva;
  const { quadra } = horario;

  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <FotoQuadra foto={quadra.foto} style={styles.foto} />
        <View style={styles.topoTextos}>
          <View style={styles.linhaNome}>
            <Text style={styles.nome} numberOfLines={1}>{quadra.nome}</Text>
            <View style={styles.tag}>
              <Text style={styles.tagTexto}>{tag}</Text>
            </View>
          </View>
          <View style={styles.linhaLocal}>
            <Ionicons name="location-sharp" size={16} color="#9A9A9A" />
            <Text style={styles.local} numberOfLines={1}>{quadra.localizacao}</Text>
          </View>
        </View>
      </View>

      <View style={styles.infos}>
        <View style={styles.info}>
          <Text style={styles.rotulo}>DATA</Text>
          <View style={styles.valorLinha}>
            <Ionicons name="calendar" size={18} color="#284066" />
            <Text style={styles.valor}>{formatarData(horario.data)}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.rotulo}>HORÁRIO</Text>
          <View style={styles.valorLinha}>
            <Ionicons name="time-outline" size={18} color="#284066" />
            <Text style={styles.valor}>
              {formatarHora(horario.horaInicio)} - {formatarHora(horario.horaFim)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.acoes}>
        <Pressable
          style={[styles.botao, ocupado && { opacity: 0.6 }]}
          disabled={ocupado}
          onPress={onCancelar}
        >
          <Ionicons name="close" size={16} color="#E53935" />
          <Text style={styles.botaoTexto}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 16 },
  topo: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  foto: { width: 72, height: 72, borderRadius: 14, overflow: 'hidden' },
  topoTextos: { flex: 1, gap: 8 },
  linhaNome: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  nome: { fontSize: 16, fontWeight: '700', color: '#000', flexShrink: 1 },
  tag: { backgroundColor: '#C8F0C8', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  tagTexto: { fontSize: 11, fontWeight: '600', color: '#2E9E3A' },
  linhaLocal: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  local: { fontSize: 12, fontWeight: '600', color: '#9A9A9A', flex: 1 },
  infos: {
    flexDirection: 'row', marginTop: 14, paddingVertical: 12,
    borderTopWidth: 1, borderColor: '#E5E5E5',
  },
  info: { flex: 1, gap: 4 },
  rotulo: { fontSize: 11, fontWeight: '600', color: '#9A9A9A' },
  valorLinha: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  valor: { fontSize: 12, fontWeight: '700', color: '#284066' },
  acoes: { paddingTop: 12, borderTopWidth: 1, borderColor: '#E5E5E5' },
  botao: {
    height: 38, borderRadius: 10, flexDirection: 'row', backgroundColor: '#F4AFAF',
    alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  botaoTexto: { fontSize: 13, fontWeight: '600', color: '#E53935' },
});
