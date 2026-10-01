// SCREEN: só monta a tela. Dados vêm do hook, pedaços visuais vêm dos components.
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionItem } from '../components/ActionItem';
import { InfoItem } from '../components/InfoItem';
import { useUsuario } from '../hooks/useUsuario';

export default function PerfilScreen() {
  const router = useRouter();
  const USUARIO_ID = 1; // temporário: depois virá do login
  const { usuario, carregando, erro, recarregar } =useUsuario(USUARIO_ID);;

  const sair = () => {
    // TODO: limpar token/sessão e voltar para o login
    // router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.tela} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={22} color="#333" />
        </Pressable>
        <Text style={styles.tituloHeader}>Meu Perfil</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={90} color="#fff" />
        </View>
        <Text style={styles.nome}>{usuario?.nome ?? ' '}</Text>
        <Text style={styles.papel}>Estudante</Text>

        <Text style={styles.secao}>INFORMAÇÕES ACADÊMICAS</Text>
        <View style={styles.card}>
          {carregando && <ActivityIndicator color="#284066" />}

          {erro && (
            <Pressable onPress={recarregar}>
              <Text style={styles.erro}>{erro} Toque para tentar de novo.</Text>
            </Pressable>
          )}

          {usuario && (
            <View style={{ gap: 24 }}>
              <InfoItem icone="mail" rotulo="E-mail institucional" valor={usuario.email} />
              <InfoItem icone="school" rotulo="Curso" valor={usuario.curso} />
            </View>
          )}
        </View>

        <Text style={styles.secao}>CONTA E SEGURANÇA</Text>
        <View style={styles.card}>
          <ActionItem icone="log-out-outline" titulo="Sair da Conta" onPress={sair} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#E5E5E5' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 16,
  },
  tituloHeader: { fontSize: 22, fontWeight: '600' },
  conteudo: { padding: 20, paddingBottom: 120 },
  avatar: {
    width: 140, height: 140, borderRadius: 70, backgroundColor: '#284066',
    alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 20,
  },
  nome: { fontSize: 24, fontWeight: '600', textAlign: 'center', marginTop: 24 },
  papel: { fontSize: 22, fontWeight: '600', color: '#A0A0A0', textAlign: 'center', marginTop: 4 },
  secao: { fontSize: 18, fontWeight: '600', color: '#A0A0A0', marginTop: 36, marginBottom: 12, marginLeft: 10 },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 20 },
  erro: { color: '#E53935', fontSize: 14 },
});
