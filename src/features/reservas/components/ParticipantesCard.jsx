// COMPONENT: lista de participantes da reserva (responsável primeiro).
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export function ParticipantesCard({ participantes }) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Participantes ({participantes.length})</Text>

      <View style={styles.lista}>
        {participantes.map((p, index) => (
          <View key={`${p.id}-${index}`} style={styles.linha}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={22} color="#fff" />
            </View>
            <View>
              <Text style={styles.nome}>{p.nome}</Text>
              <Text style={styles.papel}>{p.papel}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 24, borderWidth: 1, borderColor: '#EEE', padding: 16 },
  titulo: { fontSize: 13, fontWeight: '600', color: '#A0A0A0' },
  lista: { gap: 14, marginTop: 14 },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#284066',
    alignItems: 'center', justifyContent: 'center',
  },
  nome: { fontSize: 15, fontWeight: '600', color: '#000' },
  papel: { fontSize: 12, fontWeight: '600', color: '#A0A0A0', textTransform: 'uppercase', marginTop: 1 },
});