// SCREEN: Meus Agendamentos. Monta a tela com hook + components.
import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Abas } from '../../components/Abas';
import { ReservaCard } from '../../components/ReservaCard';
import { USUARIO_ID } from '../../Config/sessao';
import { useReservas } from '../../hooks/useReservas';
import Header from "../../components/Header";

const ABAS = [
  { chave: 'proximos', titulo: 'Próximos' },
  { chave: 'historico', titulo: 'Histórico' },
];

export default function ReservasScreen() {
  const [aba, setAba] = useState('proximos');
  const { proximos, historico, carregando, erro, processandoId, recarregar, cancelar, fazerCheckIn } =
    useReservas(USUARIO_ID);

  const lista = aba === 'proximos' ? proximos : historico;
  const ehProximos = aba === 'proximos';

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
    <SafeAreaView style={styles.tela} edges={[]}>
      <Header titulo="Minhas Reservas" />

      <FlatList
        data={lista}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        refreshing={carregando}
        onRefresh={recarregar}
        ListHeaderComponent={
          <View style={{ marginBottom: 16, gap: 12 }}>
            <Abas opcoes={ABAS} selecionada={aba} onSelecionar={setAba} />
            {erro && <Text style={styles.erro}>{erro}</Text>}
          </View>
        }
        ListEmptyComponent={
          carregando ? (
            <ActivityIndicator color="#284066" style={{ marginTop: 32 }} />
          ) : (
            <Text style={styles.vazio}>
              {ehProximos ? 'Nenhum agendamento confirmado.' : 'Nenhum check-in realizado ainda.'}
            </Text>
          )
        }
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <ReservaCard
            reserva={item}
            tag={ehProximos ? 'Confirmado' : 'Concluído'}
            mostrarAcoes={ehProximos}
            ocupado={processandoId === item.id}
            onCheckIn={() => fazerCheckIn(item.id)}
            onCancelar={() => confirmarCancelamento(item)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#E5E5E5' },
  lista: { padding: 20, paddingBottom: 120 },
  erro: { color: '#E53935', fontSize: 14, textAlign: 'center' },
  vazio: { textAlign: 'center', color: '#9A9A9A', fontSize: 15, marginTop: 32 },
});

