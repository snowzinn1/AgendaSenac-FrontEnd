// COMPONENT: foto, nome e local da quadra + data e horário da reserva.
// Recebe o `horario` do back (com a quadra dentro): { data, horaInicio, horaFim, quadra }.
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { formatarData, formatarHora } from '../Utils/formatadores';
import { FotoQuadra } from './FotoQuadra';

export function QuadraResumoCard({ horario }) {
  const { quadra } = horario;

  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <FotoQuadra foto={quadra.foto} style={styles.foto} />

        <View style={styles.textos}>
          <Text style={styles.nome}>{quadra.nome}</Text>
          {!!quadra.localizacao && (
            <View style={styles.linhaLocal}>
              <Ionicons name="location-sharp" size={16} color="#A0A0A0" />
              <Text style={styles.local}>{quadra.localizacao}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.divisor} />

      <View style={styles.detalhes}>
        <View style={styles.coluna}>
          <Text style={styles.rotulo}>DATA</Text>
          <View style={styles.valorLinha}>
            <Ionicons name="calendar-outline" size={18} color="#284066" />
            <Text style={styles.valor}>{formatarData(horario.data)}</Text>
          </View>
        </View>

        <View style={styles.coluna}>
          <Text style={styles.rotulo}>HORÁRIO</Text>
          <View style={styles.valorLinha}>
            <Ionicons name="time-outline" size={18} color="#284066" />
            <Text style={styles.valor}>
              {formatarHora(horario.horaInicio)} - {formatarHora(horario.horaFim)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 24, borderWidth: 1, borderColor: '#EEE', padding: 16 },
  topo: { flexDirection: 'row', gap: 14 },
  foto: { width: 72, height: 72, borderRadius: 16, overflow: 'hidden' },
  textos: { flex: 1, justifyContent: 'center' },
  nome: { fontSize: 18, fontWeight: '600', color: '#000' },
  linhaLocal: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  local: { flex: 1, fontSize: 13, fontWeight: '600', color: '#A0A0A0' },
  divisor: { height: StyleSheet.hairlineWidth, backgroundColor: '#DDD', marginVertical: 14 },
  detalhes: { flexDirection: 'row' },
  coluna: { flex: 1 },
  rotulo: { fontSize: 11, fontWeight: '600', color: '#A0A0A0' },
  valorLinha: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  valor: { fontSize: 14, fontWeight: '700', color: '#284066' },
});
