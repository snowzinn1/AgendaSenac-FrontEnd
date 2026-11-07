// COMPONENT: card de uma reserva do dia na visão do admin (quadra, responsável, horário e check-in).
// O código de acesso NÃO aparece aqui: o aluno apresenta e o admin digita para conferir.
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatarHora } from '../Utils/formatadores';
import { FotoQuadra } from './FotoQuadra';

export function ReservaAdminCard({ reserva, feito = false, onCheckin }) {
  const { horario, usuario } = reserva;
  const { quadra } = horario;

  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <FotoQuadra foto={quadra.foto} style={styles.foto} />

        <View style={styles.textos}>
          <View style={styles.linhaNome}>
            <Text style={styles.nome} numberOfLines={1}>{quadra.nome}</Text>
            <View style={[styles.tag, feito ? styles.tagFeita : styles.tagEspera]}>
              <Text style={[styles.tagTexto, feito ? styles.tagTextoFeita : styles.tagTextoEspera]}>
                {feito ? 'Check-in feito' : 'Aguardando'}
              </Text>
            </View>
          </View>

          <View style={styles.linhaInfo}>
            <Ionicons name="person" size={16} color="#9A9A9A" />
            <Text style={styles.responsavel} numberOfLines={1}>
              {usuario?.nome ?? 'Responsável'}
            </Text>
          </View>

          <View style={styles.linhaInfo}>
            <Ionicons name="time-outline" size={16} color="#284066" />
            <Text style={styles.horario}>
              {formatarHora(horario.horaInicio)} - {formatarHora(horario.horaFim)}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [styles.botao, feito && styles.botaoFeito, pressed && { opacity: 0.85 }]}
        disabled={feito}
        onPress={onCheckin}
      >
        <Ionicons
          name={feito ? 'checkmark-circle' : 'key-outline'}
          size={18}
          color={feito ? '#2E9E3A' : '#fff'}
        />
        <Text style={[styles.botaoTexto, feito && styles.botaoTextoFeito]}>
          {feito ? 'Check-in confirmado' : 'Fazer check-in'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 16, gap: 14 },
  topo: { flexDirection: 'row', gap: 12 },
  foto: { width: 72, height: 72, borderRadius: 14, overflow: 'hidden' },
  textos: { flex: 1, gap: 6 },
  linhaNome: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  nome: { fontSize: 16, fontWeight: '700', color: '#000', flexShrink: 1 },
  tag: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  tagEspera: { backgroundColor: '#FAD3BC' },
  tagFeita: { backgroundColor: '#C8F0C8' },
  tagTexto: { fontSize: 11, fontWeight: '600' },
  tagTextoEspera: { color: '#F07F4A' },
  tagTextoFeita: { color: '#2E9E3A' },
  linhaInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  responsavel: { fontSize: 13, fontWeight: '600', color: '#9A9A9A', flex: 1 },
  horario: { fontSize: 13, fontWeight: '700', color: '#284066' },
  botao: {
    height: 44, borderRadius: 12, backgroundColor: '#284066', flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  botaoFeito: { backgroundColor: '#E3F5E3' },
  botaoTexto: { fontSize: 14, fontWeight: '600', color: '#fff' },
  botaoTextoFeito: { color: '#2E9E3A' },
});
