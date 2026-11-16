// COMPONENT reutilizável: ícone + rótulo + valor (usado para e-mail e curso).
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export function InfoItem({ icone, rotulo, valor }) {
  return (
    <View style={styles.linha}>
      <View style={styles.caixaIcone}>
        <Ionicons name={icone} size={24} color="#284066" />
      </View>
      <View style={styles.textos}>
        <Text style={styles.rotulo}>{rotulo}</Text>
        <Text style={styles.valor}>{valor}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  caixaIcone: {
    width: 56, height: 56, borderRadius: 12,
    backgroundColor: '#B0B9C7', alignItems: 'center', justifyContent: 'center',
  },
  textos: { flex: 1 },
  rotulo: { fontSize: 12, color: '#9A9A9A', textTransform: 'uppercase' },
  valor: { fontSize: 14, fontWeight: '600', color: '#000', marginTop: 2 },
});