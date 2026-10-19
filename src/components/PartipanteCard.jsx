// COMPONENT: card de um participante (nome + CPF).
// Modo responsável: somenteLeitura. Modo participante: editável, com lixeira.
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { mascararCpf } from '../Utils/cpf';

function Campo({ rotulo, valor, placeholder, somenteLeitura, onChangeText, ...resto }) {
  return (
    <View style={styles.campo}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <TextInput
        style={styles.input}
        value={valor}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        editable={!somenteLeitura}
        onChangeText={onChangeText}
        {...resto}
      />
    </View>
  );
}

export function ParticipanteCard({
  titulo,
  nome,
  cpf,
  somenteLeitura = false,
  destaque = false,
  onChangeNome,
  onChangeCpf,
  onRemover,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <Text style={[styles.titulo, destaque && styles.tituloDestaque]}>{titulo}</Text>
        {onRemover && (
          <Pressable onPress={onRemover} hitSlop={10}>
            <Ionicons name="trash" size={22} color="#9A9A9A" />
          </Pressable>
        )}
      </View>

      <Campo
        rotulo="NOME COMPLETO"
        valor={nome}
        placeholder="Nome completo"
        somenteLeitura={somenteLeitura}
        onChangeText={onChangeNome}
        autoCapitalize="words"
      />
      <Campo
        rotulo="CPF"
        valor={cpf}
        placeholder="000.000.000-00"
        somenteLeitura={somenteLeitura}
        onChangeText={(texto) => onChangeCpf?.(mascararCpf(texto))}
        keyboardType="number-pad"
        maxLength={14}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 28, padding: 20, gap: 12 },
  topo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  titulo: { fontSize: 13, fontWeight: '700', color: '#555' },
  tituloDestaque: { color: '#284066' },
  campo: { gap: 6 },
  rotulo: { fontSize: 13, fontWeight: '600', color: '#8A8A8A' },
  input: {
    height: 50, borderRadius: 14, backgroundColor: '#E2E2E2',
    paddingHorizontal: 16, fontSize: 15, fontWeight: '600', color: '#555',
  },
});
