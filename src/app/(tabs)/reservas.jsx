// SCREEN: Minhas Reservas. Só as reservas ativas: o back apaga a reserva depois do check-in.
import { ActivityIndicator, Alert, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { ReservaCard } from '../../components/ReservaCard';
import { useSessao } from '../../Config/sessao';
import { useReservas } from '../../hooks/useReservas';

export default function ReservasScreen() {
  const { usuario } = useSessao();
  const { reservas, carregando, erro, processandoId, recarregar, cancelar } = useReservas(usuario?.id);

  // Alert com botões não funciona no navegador, então usamos confirm lá
  const confirmarCancelamento = (reserva) => {
    if (Platform.OS === 'web') {
      if (window.confirm('Deseja cancelar este agendamento?')) cancelar(reserva.id);
      return;
    }
    Alert.alert('Cancelar agendamento', 'Deseja cancelar este agendamento?', [
      { text: 'Voltar', style: 'cancel' },
      { text: 'Cancelar agendamento', style: 'destructive', onPress: () => cancelar(reserva.id) },
    ]);
  };

  return (
    <View style={styles.tela}>
      <Header titulo="Minhas Reservas" />

      <FlatList
        data={reservas}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        refreshing={carregando}
        onRefresh={recarregar}
        ListHeaderComponent={erro ? <Text style={styles.erro}>{erro}</Text> : null}
        ListEmptyComponent={
          carregando ? (
            <ActivityIndicator color="#284066" style={{ marginTop: 32 }} />
          ) : (
            <Text style={styles.vazio}>Nenhum agendamento confirmado.</Text>
          )
        }
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <ReservaCard
            reserva={item}
            ocupado={processandoId === item.id}
            onCancelar={() => confirmarCancelamento(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#E5E5E5' },
  lista: { padding: 20, paddingBottom: 120 },
  erro: { color: '#E53935', fontSize: 14, textAlign: 'center', marginBottom: 16 },
  vazio: { textAlign: 'center', color: '#9A9A9A', fontSize: 15, marginTop: 32 },
});
