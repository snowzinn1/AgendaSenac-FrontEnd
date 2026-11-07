// COMPONENT: janela para o admin digitar o código de acesso e confirmar o check-in.
// Recebe tudo por props: não sabe nada de API. Aparece quando `reserva` não é null.
import { useEffect, useState } from 'react';
import {
  ActivityIndicator, KeyboardAvoidingView, Modal, Platform,
  Pressable, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { codigoCompleto, mascararCodigo } from '../Utils/codigoAcesso';
import { formatarHora } from '../Utils/formatadores';

export function CheckinModal({ reserva, enviando = false, erro = null, onConfirmar, onFechar }) {
  const [codigo, setCodigo] = useState('');

  // Limpa o campo sempre que abre para outra reserva
  useEffect(() => {
    setCodigo('');
  }, [reserva?.id]);

  const pronto = codigoCompleto(codigo) && !enviando;

  return (
    <Modal visible={!!reserva} transparent animationType="fade" onRequestClose={onFechar}>
      <KeyboardAvoidingView
        style={styles.fundo}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.caixa}>
          <Text style={styles.titulo}>Confirmar check-in</Text>

          {reserva && (
            <Text style={styles.resumo}>
              {reserva.horario.quadra.nome} · {formatarHora(reserva.horario.horaInicio)} -{' '}
              {formatarHora(reserva.horario.horaFim)}
              {reserva.usuario?.nome ? `\n${reserva.usuario.nome}` : ''}
            </Text>
          )}

          <Text style={styles.rotulo}>Código de acesso apresentado</Text>
          <TextInput
            style={styles.input}
            value={codigo}
            onChangeText={(v) => setCodigo(mascararCodigo(v))}
            placeholder="ABCD-12345"
            placeholderTextColor="#B5B5B5"
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={10}
            editable={!enviando}
          />

          {!!erro && <Text style={styles.erro}>{erro}</Text>}

          <Pressable
            style={[styles.confirmar, !pronto && styles.confirmarDesativado]}
            disabled={!pronto}
            onPress={() => onConfirmar(codigo)}
          >
            {enviando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.confirmarTexto}>Confirmar check-in</Text>
            )}
          </Pressable>

          <Pressable style={styles.cancelar} onPress={onFechar} disabled={enviando}>
            <Text style={styles.cancelarTexto}>Cancelar</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  caixa: { width: '100%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 28, padding: 24, gap: 10 },
  titulo: { fontSize: 20, fontWeight: '700', color: '#000', textAlign: 'center' },
  resumo: { fontSize: 13, fontWeight: '600', color: '#9A9A9A', textAlign: 'center', lineHeight: 20 },
  rotulo: { fontSize: 12, fontWeight: '600', color: '#9A9A9A', marginTop: 12 },
  input: {
    height: 56, borderRadius: 14, backgroundColor: '#EFEFEF', textAlign: 'center',
    fontSize: 22, fontWeight: '700', letterSpacing: 2, color: '#284066',
  },
  erro: { color: '#E53935', fontSize: 13, textAlign: 'center' },
  confirmar: {
    height: 52, borderRadius: 14, backgroundColor: '#284066',
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  confirmarDesativado: { opacity: 0.45 },
  confirmarTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cancelar: { height: 44, alignItems: 'center', justifyContent: 'center' },
  cancelarTexto: { color: '#7A7A7A', fontSize: 15, fontWeight: '600' },
});
