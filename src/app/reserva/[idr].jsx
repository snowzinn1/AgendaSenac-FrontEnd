// SCREEN: detalhe da reserva. Dados vêm do hook, pedaços visuais vêm dos components.
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CodigoAcessoCard } from '../../components/CodigoAcessoCard';
import Header from '../../components/Header';
import { ParticipantesCard } from '../../components/ParticipantesCard';
import { QuadraResumoCard } from '../../components/QuadraResumoCard';
import { ReservaStatusBanner } from '../../components/ReservaStatusBanner';
import useReserva from '../../hooks/useQuadraReservada';

export default function ReservaDetalheScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { reserva, carregando, erro, recarregar, podeCancelar, cancelando, cancelar } = useReserva(id);

  const titulo = `Reserva #${String(id).padStart(4, '0')}`;

  const voltar = () => (router.canGoBack() ? router.back() : router.replace('/'));

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

  const confirmarCancelamento = () => {
    Alert.alert(
      'Cancelar agendamento',
      'O horário voltará a ficar disponível para outras pessoas. Deseja cancelar?',
      [
        { text: 'Manter reserva', style: 'cancel' },
        { text: 'Cancelar agendamento', style: 'destructive', onPress: executarCancelamento },
      ]
    );
  };

  return (
    <View style={styles.tela}>
      <Header titulo={titulo} />

      {carregando && (
        <View style={styles.centro}>
          <ActivityIndicator color="#284066" />
        </View>
      )}

      {erro && !carregando && (
        <View style={styles.centro}>
          <Text style={styles.erro}>{erro}</Text>
          <Pressable onPress={recarregar} style={styles.botaoTentar}>
            <Text style={styles.textoTentar}>Tentar de novo</Text>
          </Pressable>
        </View>
      )}

      {reserva && !carregando && (
        <ScrollView contentContainerStyle={styles.conteudo}>
          <ReservaStatusBanner status={reserva.status} />
          <CodigoAcessoCard codigo={reserva.codigoAcesso} />
          <QuadraResumoCard
            quadra={reserva.quadra}
            data={reserva.data}
            horaInicio={reserva.horaInicio}
            horaFim={reserva.horaFim}
          />
          <ParticipantesCard participantes={reserva.participantes} />

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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#E5E5E5' },
  conteudo: { padding: 20, paddingBottom: 120, gap: 24 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  erro: { color: '#E53935', fontSize: 15, textAlign: 'center' },
  botaoTentar: { backgroundColor: '#284066', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 24 },
  textoTentar: { color: '#fff', fontSize: 15, fontWeight: '600' },
  botaoCancelar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: '#E3B4B2', borderRadius: 20, paddingVertical: 20,
  },
  botaoDesativado: { backgroundColor: '#D4D4D4' },
  textoCancelar: { fontSize: 18, fontWeight: '600', color: '#E53935' },
  textoDesativado: { color: '#9A9A9A' },
  dica: { fontSize: 13, color: '#777', textAlign: 'center', marginTop: -8 },
});

