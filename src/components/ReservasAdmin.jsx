// SCREEN (visão do admin em "Minhas Reservas"): reservas ATIVAS de hoje + check-in pelo código.
// Quem decide mostrar esta visão é o (tabs)/reservas.jsx.
import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useReservasDoDia } from '../hooks/useReservasDoDia';
import { hojeISO } from '../Utils/datas';
import { formatarData } from '../Utils/formatadores';
import { CheckinModal } from './CheckInModal';
import Header from './Header';
import { ReservaAdminCard } from './ReservaAdminCard';

export default function ReservasAdmin() {
  const { reservas, carregando, erro, recarregar, confirmados, fazerCheckin } = useReservasDoDia();

  const [selecionada, setSelecionada] = useState(null); // reserva aberta no modal
  const [enviando, setEnviando] = useState(false);
  const [erroCheckin, setErroCheckin] = useState(null);

  const abrirCheckin = (reserva) => {
    setErroCheckin(null);
    setSelecionada(reserva);
  };

  const fecharCheckin = () => {
    if (!enviando) setSelecionada(null);
  };

  const confirmar = async (codigo) => {
    setEnviando(true);
    setErroCheckin(null);
    const resultado = await fazerCheckin(selecionada, codigo);
    setEnviando(false);

    if (!resultado.ok) {
      setErroCheckin(resultado.mensagem); // fica no modal para tentar de novo
      return;
    }
    setSelecionada(null);
  };

  const total = reservas.length;

  return (
    <View style={styles.tela}>
      <Header titulo="Reservas de Hoje" />

      <FlatList
        data={reservas}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        refreshing={carregando}
        onRefresh={recarregar}
        ListHeaderComponent={
          <View>
            <Text style={styles.resumo}>
              {formatarData(hojeISO())} · {total} {total === 1 ? 'reserva' : 'reservas'} para hoje
            </Text>
            {!!erro && <Text style={styles.erro}>{erro}</Text>}
          </View>
        }
        ListEmptyComponent={
          carregando ? (
            <ActivityIndicator color="#284066" style={{ marginTop: 32 }} />
          ) : (
            <Text style={styles.vazio}>Nenhuma reserva ativa para hoje.</Text>
          )
        }
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <ReservaAdminCard
            reserva={item}
            feito={confirmados.includes(item.id)}
            onCheckin={() => abrirCheckin(item)}
          />
        )}
      />

      <CheckinModal
        reserva={selecionada}
        enviando={enviando}
        erro={erroCheckin}
        onConfirmar={confirmar}
        onFechar={fecharCheckin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#E5E5E5' },
  lista: { padding: 20, paddingBottom: 120 },
  resumo: { fontSize: 14, fontWeight: '600', color: '#7A7A7A', marginLeft: 6, marginBottom: 16 },
  erro: { color: '#E53935', fontSize: 14, textAlign: 'center', marginBottom: 16 },
  vazio: { textAlign: 'center', color: '#9A9A9A', fontSize: 15, marginTop: 32 },
});
