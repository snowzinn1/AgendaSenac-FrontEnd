// COMPONENT reutilizável: linha de ação clicável (ex.: "Sair da Conta").
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function ActionItem({ icone, titulo, onPress }) {
  return (
    <Pressable style={styles.linha} onPress={onPress}>
      <View style={styles.caixaIcone}>
        <Ionicons name={icone} size={24} color="#E53935" />
      </View>
      <Text style={styles.titulo}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  caixaIcone: {
    width: 60, height: 56, borderRadius: 12,
    backgroundColor: '#F4AFAF', alignItems: 'center', justifyContent: 'center',
  },
  titulo: { fontSize: 18, fontWeight: '500', color: '#000' },
});