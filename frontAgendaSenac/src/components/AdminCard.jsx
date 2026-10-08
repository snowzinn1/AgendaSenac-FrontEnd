// COMPONENT: card grande de ação do admin.
// `destaque` = versão azul (ação principal). Sem `destaque` = versão branca.
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function AdminCard({ icone, titulo, subtitulo, destaque = false, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        destaque ? styles.cardAzul : styles.cardBranco,
        pressed && styles.pressionado,
      ]}
    >
      <View style={[styles.iconeBox, destaque ? styles.iconeBoxAzul : styles.iconeBoxCinza]}>
        <MaterialCommunityIcons
          name={icone}
          size={34}
          color={destaque ? '#C8C8C8' : '#284066'}
        />
      </View>

      <View style={styles.textos}>
        <Text style={[styles.titulo, destaque && styles.tituloClaro]}>{titulo}</Text>
        <Text style={[styles.subtitulo, destaque && styles.subtituloClaro]}>{subtitulo}</Text>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={destaque ? '#C8C8C8' : '#555'}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 24,
  },
  cardAzul: { backgroundColor: '#284066' },
  cardBranco: { backgroundColor: '#fff' },
  pressionado: { opacity: 0.85 },

  iconeBox: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeBoxAzul: { backgroundColor: 'rgba(255,255,255,0.12)' },
  iconeBoxCinza: { backgroundColor: '#DADADA' },

  textos: { flex: 1 },
  titulo: { fontSize: 18, fontWeight: '600', color: '#000' },
  tituloClaro: { color: '#fff' },
  subtitulo: { fontSize: 13, fontWeight: '500', color: '#A0A0A0', marginTop: 2 },
  subtituloClaro: { color: '#C5CCD8' },
});
