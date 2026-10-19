import { Pressable, StyleSheet, Text, View } from 'react-native';

export function Abas({ opcoes, selecionada, onSelecionar }) {
  return (
    <View style={styles.container}>
      {opcoes.map((opcao) => {
        const ativa = opcao.chave === selecionada;
        return (
          <Pressable
            key={opcao.chave}
            style={[styles.aba, ativa && styles.abaAtiva]}
            onPress={() => onSelecionar(opcao.chave)}
          >
            <Text style={[styles.texto, ativa && styles.textoAtivo]}>{opcao.titulo}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', backgroundColor: '#D5D5D5', borderRadius: 20, padding: 4 },
  aba: { flex: 1, paddingVertical: 12, borderRadius: 18, alignItems: 'center' },
  abaAtiva: { backgroundColor: '#fff' },
  texto: { fontSize: 16, fontWeight: '700', color: '#A0A0A0' },
  textoAtivo: { color: '#000' },
});
