import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";

export default function ReservasScreen() {
  return (
    <View style={styles.tela}>
      <Header titulo="Minhas Reservas" />
      <View style={styles.centro}>
        <Text style={styles.texto}>Em construção</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#E5E5E5" },
  centro: { flex: 1, alignItems: "center", justifyContent: "center" },
  texto: { fontSize: 16, color: "#A0A0A0" },
});
