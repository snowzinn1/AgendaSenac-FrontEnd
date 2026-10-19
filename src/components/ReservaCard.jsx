import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { checkInLiberado, formatarData, formatarHora } from '../Utils/formatadores';

export function ReservaCard({
  reserva,
  tag = 'Confirmado',
  mostrarAcoes = true,
  ocupado = false,
  onCheckIn,
  onCancelar,
}) {
  const { horario } = reserva;
  const { quadra } = horario;
  const podeCheckIn = checkInLiberado(horario) && !ocupado;

  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <Image source={{ uri: quadra.foto }} style={styles.foto} />
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

      {mostrarAcoes && (
        <View style={styles.acoes}>
          <Pressable
            style={[styles.botao, podeCheckIn ? styles.checkInAtivo : styles.checkInInativo]}
            disabled={!podeCheckIn}
            onPress={onCheckIn}
          >
            <Ionicons name="checkmark" size={16} color={podeCheckIn ? '#fff' : '#9A9A9A'} />
            <Text style={[styles.botaoTexto, { color: podeCheckIn ? '#fff' : '#9A9A9A' }]}>Check-in</Text>
          </Pressable>

          <Pressable style={[styles.botao, styles.cancelar]} disabled={ocupado} onPress={onCancelar}>
            <Ionicons name="close" size={16} color="#E53935" />
            <Text style={[styles.botaoTexto, { color: '#E53935' }]}>Cancelar</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 16 },
  topo: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  foto: { width: 72, height: 72, borderRadius: 14, backgroundColor: '#D5D5D5' },
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
  acoes: { flexDirection: 'row', gap: 16, paddingTop: 12, borderTopWidth: 1, borderColor: '#E5E5E5' },
  botao: {
    flex: 1, height: 38, borderRadius: 10, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  botaoTexto: { fontSize: 13, fontWeight: '600' },
  checkInInativo: { backgroundColor: '#E0E0E0' },
  checkInAtivo: { backgroundColor: '#284066' },
  cancelar: { backgroundColor: '#F4AFAF' },
});
