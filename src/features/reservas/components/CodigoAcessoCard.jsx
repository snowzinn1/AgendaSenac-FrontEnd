// COMPONENT: cartão com o código de acesso único da reserva.
import { StyleSheet, Text, View } from 'react-native';

export function CodigoAcessoCard({ codigo }) {
  return (
    <View style={styles.card}>
      <Text style={styles.rotulo}>Código de Acesso</Text>
      {/* selectable: segurar o dedo no código permite copiar */}
      <Text style={styles.codigo} selectable>
        {codigo ?? '—'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#EEE',
    paddingVertical: 56,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  rotulo: { fontSize: 16, fontWeight: '600', color: '#A0A0A0' },
  codigo: { fontSize: 30, fontWeight: '700', color: '#284066', letterSpacing: 1, marginTop: 12 },
});
