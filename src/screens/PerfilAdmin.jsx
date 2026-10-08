// SCREEN (visão do admin): só monta a tela. Quem decide mostrar esta visão é o perfil.jsx.
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AdminCard } from '../components/AdminCard';
import Header from '../components/Header';

export default function PerfilAdmin({ usuario }) {
  const adicionarQuadra = () => {
    // TODO: router.push('/quadras/nova')  (importe useRouter de 'expo-router')
  };

  const gerenciarQuadras = () => {
    // TODO: router.push('/quadras')
  };

  return (
    <View style={styles.tela}>
      <Header titulo="Perfil Admin" />

      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={90} color="#fff" />
        </View>
        <Text style={styles.nome}>{usuario.nome}</Text>
        <Text style={styles.papel}>Admin</Text>

        <View style={styles.acoes}>
          <AdminCard
            destaque
            icone="plus-circle"
            titulo="Adicionar Quadra"
            subtitulo="Criar novo espaço esportivo"
            onPress={adicionarQuadra}
          />
          <AdminCard
            icone="calendar-remove-outline"
            titulo="Gerenciar Quadra"
            subtitulo="Editar, pausar ou remover"
            onPress={gerenciarQuadras}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#E5E5E5' },
  conteudo: { padding: 20, paddingBottom: 120 },
  avatar: {
    width: 140, height: 140, borderRadius: 70, backgroundColor: '#284066',
    alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 20,
  },
  nome: { fontSize: 24, fontWeight: '600', textAlign: 'center', marginTop: 24 },
  papel: { fontSize: 22, fontWeight: '600', color: '#A0A0A0', textAlign: 'center', marginTop: 4 },
  acoes: { gap: 16, marginTop: 40 },
});
