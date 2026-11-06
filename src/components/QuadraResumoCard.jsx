// COMPONENT: foto, nome e local da quadra + data e horário da reserva.
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// '2026-06-11' -> '11 Jun, 2026' (sem usar Date, para não ter problema de fuso)
function formatarData(iso) {
  if (!iso) return '--';
  const [ano, mes, dia] = iso.split('T')[0].split('-');
  return `${dia} ${MESES[Number(mes) - 1]}, ${ano}`;
}

// '10:00:00' -> '10:00'
const formatarHora = (h) => (h ? h.slice(0, 5) : '--:--');

export function QuadraResumoCard({ quadra, data, horaInicio, horaFim }) {
  const horario = horaFim
    ? `${formatarHora(horaInicio)} - ${formatarHora(horaFim)}`
    : formatarHora(horaInicio);

  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        {quadra.imagem ? (
          <Image source={{ uri: quadra.imagem }} style={styles.foto} />
        ) : (
          <View style={[styles.foto, styles.fotoVazia]}>
            <MaterialCommunityIcons name="soccer-field" size={36} color="#fff" />
          </View>
        )}

        <View style={styles.textos}>
          <Text style={styles.nome}>{quadra.nome ?? 'Quadra'}</Text>
          {!!quadra.local && (
            <View style={styles.linhaLocal}>
              <Ionicons name="location-sharp" size={16} color="#A0A0A0" />
              <Text style={styles.local}>{quadra.local}</Text>
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
            <Text style={styles.valor}>{formatarData(data)}</Text>
          </View>
        </View>

        <View style={styles.coluna}>
          <Text style={styles.rotulo}>HORÁRIO</Text>
          <View style={styles.valorLinha}>
            <Ionicons name="time-outline" size={18} color="#284066" />
            <Text style={styles.valor}>{horario}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 24, borderWidth: 1, borderColor: '#EEE', padding: 16 },
  topo: { flexDirection: 'row', gap: 14 },
  foto: { width: 72, height: 72, borderRadius: 16 },
  fotoVazia: { backgroundColor: '#284066', alignItems: 'center', justifyContent: 'center' },
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