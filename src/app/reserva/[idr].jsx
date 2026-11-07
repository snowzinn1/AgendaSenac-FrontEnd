// SCREEN: detalhe da reserva. Recebe o id na rota: /reserva/<id>.
// Dados vêm do hook, pedaços visuais vêm dos components.
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CodigoAcessoCard } from '../../components/CodigoAcessoCard';
import Header from '../../components/Header';
import { ParticipantesCard } from '../../components/ParticipantesCard';
import { QuadraResumoCard } from '../../components/QuadraResumoCard';
import { ReservaStatusBanner } from '../../components/ReservaStatusBanner';
import { useSessao } from '../../Config/sessao';
import useQuadraReservada from '../../hooks/useQuadraReservada';

export default function ReservaDetalheScreen() {
  const { idr } = useLocalSearchParams(); // o nome do parâmetro é o nome do arquivo: [idr]
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { usuario: sessao } = useSessao();
  const {
    reserva, participantes, carregando, erro, recarregar,
    podeCancelar, cancelando, cancelar,
  } = useQuadraReservada(idr, sessao);

  // Sem login, volta para a tela de login
  if (!sessao) return <Redirect href="/" />;

  const titulo = `Reserva #${String(idr).padStart(4, '0')}`;

  const voltar = () => (router.canGoBack() ? router.back() : router.replace('/reservas'));

  const executarCancelamento = async () => {
    const resultado = await cancelar();
    if (!resultado.ok) {
      Alert.alert('Não foi possível cancelar', resultado.mensagem);
      return;
    }
    Alert.alert('Agendamento cancelado', 'O horário voltou a ficar disponível.', [
      { text: 'OK', onPress: voltar },
    ]);
  };

  // Alert com botões não funciona no navegador, então usamos confirm lá
  const confirmarCancelamento = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Deseja cancelar este agendamento?')) executarCancelamento();
      return;
    }
    Alert.alert(
      'Cancelar agendamento',
      'O horário voltará a ficar disponível para outras pessoas. Deseja cancelar?',
      [
        { text: 'Manter reserva', style: 'cancel' },
        { text: 'Cancelar agendamento', style: 'destructive', onPress: executarCancelamento },
      ]
    );
  };

  if (carregando || erro) {
    return (
      <View style={styles.tela}>
        <Header titulo={titulo} />
        <View style={styles.centro}>
          {carregando ? (
            <ActivityIndicator color="#284066" />
          ) : (
            <Pressable onPress={recarregar}>
              <Text style={styles.erro}>{erro} Toque para tentar de novo.</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.tela}>
      <Header titulo={titulo} />

      <ScrollView contentContainerStyle={[styles.conteudo, { paddingBottom: insets.bottom + 40 }]}>
        <ReservaStatusBanner status={reserva.status} />
        <CodigoAcessoCard codigo={reserva.codigoAcesso} />
        <QuadraResumoCard horario={reserva.horario} />
        <ParticipantesCard participantes={participantes} />

        {reserva.status === 'ATIVA' && (
          <>
            <Pressable
              onPress={confirmarCancelamento}
              disabled={!podeCancelar || cancelando}
              style={[styles.botaoCancelar, !podeCancelar && styles.botaoDesativado]}
            >
              {cancelando ? (
                <ActivityIndicator color="#E53935" />
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="calendar-remove"
                    size={22}
                    color={podeCancelar ? '#E53935' : '#9A9A9A'}
                  />
                  <Text style={[styles.textoCancelar, !podeCancelar && styles.textoDesativado]}>
                    Cancelar Agendamento
                  </Text>
                </>
              )}
            </Pressable>

            {!podeCancelar && (
              <Text style={styles.dica}>
                O cancelamento só é possível até 2 horas antes do horário. Em caso de necessidade,
                entre em contato com o suporte.
              </Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#E5E5E5' },
  conteudo: { padding: 20, gap: 24 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  erro: { color: '#E53935', fontSize: 14, textAlign: 'center' },
  botaoCancelar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: '#E3B4B2', borderRadius: 20, paddingVertical: 20,
  },
  botaoDesativado: { backgroundColor: '#D4D4D4' },
  textoCancelar: { fontSize: 18, fontWeight: '600', color: '#E53935' },
  textoDesativado: { color: '#9A9A9A' },
  dica: { fontSize: 13, color: '#777', textAlign: 'center', marginTop: -8 },
});
