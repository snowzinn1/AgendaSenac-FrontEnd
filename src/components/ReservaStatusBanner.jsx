// COMPONENT: faixa de status no topo da reserva.
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

const CONFIGS = {
  ATIVA: {
    titulo: 'Reserva Confirmada',
    subtitulo: 'Apresente o código no local',
    fundo: '#CADFCA',
    cor: '#3E9A41',
  },
  CONCLUIDA: {
    titulo: 'Reserva Concluída',
    subtitulo: 'Este agendamento já foi utilizado',
    fundo: '#D3DAE6',
    cor: '#284066',
  },
};

export function ReservaStatusBanner({ status }) {
  const cfg = CONFIGS[status] ?? {
    titulo: status ?? 'Reserva',
    subtitulo: '',
    fundo: '#DADADA',
    cor: '#555',
  };

  return (
    <View style={[styles.faixa, { backgroundColor: cfg.fundo }]}>
      <View style={[styles.circulo, { backgroundColor: cfg.cor }]}>
        <Ionicons name="checkmark" size={34} color="#fff" />
      </View>
      <View style={styles.textos}>
        <Text style={[styles.titulo, { color: cfg.cor }]}>{cfg.titulo}</Text>
        {!!cfg.subtitulo && <Text style={[styles.subtitulo, { color: cfg.cor }]}>{cfg.subtitulo}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  faixa: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: 24 },
  circulo: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  textos: { flex: 1 },
  titulo: { fontSize: 20, fontWeight: '600' },
  subtitulo: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', marginTop: 2 },
});
