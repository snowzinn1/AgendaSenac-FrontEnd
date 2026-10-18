import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CampoSelect } from "../../components/CampoSelect";
import { CampoTexto } from "../../components/CampoTexto";
import Header from "../../components/Header";
import { criarQuadra } from "../../Services/quadraService";

const ESPORTES = ["Basquete", "Futebol", "Futsal", "Vôlei", "Tênis"];
// rótulo exibido -> valor do enum StatusQuadra no back-end (confira os nomes no seu enum)
const STATUS = {
  Disponível: "DISPONIVEL",
  Indisponível: "INDISPONIVEL",
  "Em manutenção": "MANUTENCAO",
};

export default function AdicionarQuadraScreen() {
  const router = useRouter();
  const [salvando, setSalvando] = useState(false);
  const [nome, setNome] = useState("");
  const [esporte, setEsporte] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [status, setStatus] = useState("Disponível");
  const [foto, setFoto] = useState(null);

  const escolherFoto = () => {
    // TODO: instalar `expo-image-picker` e chamar launchImageLibraryAsync / launchCameraAsync
    // depois: setFoto(resultado.assets[0].uri)
  };

  const salvar = async () => {
    if (!nome.trim() || !esporte || !localizacao.trim()) {
      Alert.alert("Atenção", "Preencha nome, esporte e localização.");
      return;
    }

    try {
      setSalvando(true);
      await criarQuadra({
        nome: nome.trim(),
        localizacao: localizacao.trim(),
        modalidade: esporte,
        foto: foto ?? "", // o back-end exige o campo (nullable = false)
        status: STATUS[status],
      });
      Alert.alert("Sucesso", "Quadra cadastrada!");
      router.back();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar a quadra.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={styles.tela}>
      <Header titulo="Adicionar Quadra" />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <CampoTexto
          rotulo="Nome da Quadra"
          icone="person"
          valor={nome}
          onChangeText={setNome}
          placeholder="Ex: Quadra Poliesportiva Central"
        />

        <CampoSelect
          rotulo="Tipo de Esporte"
          icone="key"
          placeholder="Selecione o esporte"
          valor={esporte}
          opcoes={ESPORTES}
          onChange={setEsporte}
        />

        <CampoTexto
          rotulo="Localização"
          icone="search"
          valor={localizacao}
          onChangeText={setLocalizacao}
          placeholder="Ex: Bloco A - Piso 2"
        />

        <CampoSelect
          rotulo="Status"
          icone="checkmark-circle"
          valor={status}
          opcoes={Object.keys(STATUS)}
          onChange={setStatus}
        />

        <Text style={styles.secao}>FOTO DA QUADRA</Text>
        <Pressable style={styles.upload} onPress={escolherFoto}>
          <View style={styles.cameraBox}>
            <Ionicons name="camera" size={22} color="#284066" />
          </View>
          <Text style={styles.uploadTexto}>
            {foto
              ? "Foto selecionada"
              : "Toque para fazer upload e tirar uma foto"}
          </Text>
        </Pressable>

        <View style={styles.regras}>
          <View style={styles.regrasTitulo}>
            <View style={styles.regrasBolinha} />
            <Text style={styles.regrasTituloTexto}>Regras de Uso</Text>
          </View>
          <Text style={styles.regrasTexto}>
            Certifique-se de que os dados estão corretos antes de salvar.
            Quadras novas passam por aprovação.
          </Text>
        </View>

        <Pressable
          onPress={salvar}
          disabled={salvando}
          style={({ pressed }) => [
            styles.botao,
            (pressed || salvando) && { opacity: 0.85 },
          ]}
        >
          {salvando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botaoTexto}>Salvar Quadra</Text>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#E5E5E5" },
  conteudo: { padding: 20, gap: 16, paddingBottom: 130 },
  secao: { fontSize: 14, fontWeight: "700", color: "#284066", marginTop: 8 },
  upload: {
    height: 130,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#D0D0D0",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  cameraBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadTexto: { fontSize: 11, fontWeight: "600", color: "#8A8A8A" },
  regras: {
    backgroundColor: "#284066",
    borderRadius: 20,
    padding: 18,
    gap: 8,
    marginTop: 8,
  },
  regrasTitulo: { flexDirection: "row", alignItems: "center", gap: 10 },
  regrasBolinha: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#5C7BA8",
  },
  regrasTituloTexto: { fontSize: 18, fontWeight: "700", color: "#fff" },
  regrasTexto: { fontSize: 12, color: "#6F8AB3" },
  botao: {
    height: 58,
    borderRadius: 16,
    backgroundColor: "#284066",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  botaoTexto: { fontSize: 22, fontWeight: "700", color: "#fff" },
});
