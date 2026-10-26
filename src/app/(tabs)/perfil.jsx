// SCREEN: só monta a tela. Dados vêm do hook, pedaços visuais vêm dos components.
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActionItem } from '../../components/ActionItem';
import Header from '../../components/Header';
import { InfoItem } from '../../components/InfoItem';
import { ehAdmin, useSessao } from '../../Config/sessao';
import useUsuario from '../../hooks/useUsuario';
import PerfilAdmin from '../../components/PerfilAdmin';

export default function PerfilScreen() {
  const router = useRouter();
  const { usuario: sessao, sair: encerrarSessao } = useSessao();
  const { usuario, carregando, erro, recarregar } = useUsuario(sessao?.id, sessao?.tipoUsuario);

  const sair = () => {
    encerrarSessao();
    router.replace('/'); // volta para o login
  };

  // O tipo vem do login (campo tipoUsuario do back: ALUNO | ADMIN)
  if (ehAdmin(sessao)) return <PerfilAdmin usuario={usuario ?? sessao} onSair={sair} />;

  return (
    <View style={styles.tela}>
      <Header titulo="Meu Perfil" />

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
  secao: { fontSize: 18, fontWeight: '600', color: '#A0A0A0', marginTop: 36, marginBottom: 12, marginLeft: 10 },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 20 },
  erro: { color: '#E53935', fontSize: 14 },
});
