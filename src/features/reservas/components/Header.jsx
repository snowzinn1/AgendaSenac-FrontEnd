import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header({ titulo }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.linha}>
        {/* Botão voltar: só aparece se existir tela anterior */}
        <View style={styles.lado}>
          {router.canGoBack() && (
            <Pressable onPress={() => router.back()} hitSlop={12}>
              <Ionicons name="chevron-back" size={24} color="#555" />
            </Pressable>
          )}
        </View>

        {/* Logo + título (o título é o único que muda) */}
        <View style={styles.centro}>
          <Image
            source={require('../../assets/images/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.titulo}>{titulo}</Text>
        </View>

        {/* Espaço vazio do lado direito para manter o centro alinhado */}
        <View style={styles.lado} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  linha: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  lado: {
    width: 40,
  },
  centro: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
});