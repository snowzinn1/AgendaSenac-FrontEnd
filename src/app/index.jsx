import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { CampoTexto } from "../components/CampoTexto";
import { ehAdmin, useSessao } from "../Config/sessao";
import { autenticar } from "../Services/authService";
import { mensagemDeErro } from "../Utils/erros";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const { entrar: iniciarSessao } = useSessao();

  const entrar = async () => {
    if (!email.trim() || !senha) {
      setErro("Informe e-mail e senha.");
      return;
    }
    try {
      setCarregando(true);
      setErro(null);
      const usuario = await autenticar(email, senha);
      if (!usuario) {
        setErro("E-mail ou senha incorretos.");
        return;
      }
      iniciarSessao(usuario);
      router.replace(ehAdmin(usuario) ? "/reservas" : "/home"); // admin não tem aba Home
    } catch (e) {
      console.log("Erro no login:", e.message, e.config?.url);
      setErro(mensagemDeErro(e, "Não foi possível entrar. Tente novamente."));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.tela}>
      <Image
        source={require("../../assets/images/icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.titulo}>Agenda Senac</Text>

      <View style={styles.form}>
        <CampoTexto
          rotulo="Email"
          icone="person"
          valor={email}
          onChangeText={setEmail}
          placeholder="meuemail@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CampoTexto
          rotulo="Senha"
          icone="lock-closed"
          valor={senha}
          onChangeText={setSenha}
          placeholder="***********"
          secureTextEntry
        />

        {erro && <Text style={styles.erro}>{erro}</Text>}

        <Pressable
          onPress={entrar}
          disabled={carregando}
          style={({ pressed }) => [styles.botao, (pressed || carregando) && { opacity: 0.85 }]}
        >
          {carregando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botaoTexto}>Entrar</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  logo: { width: 130, height: 130, alignSelf: "center" },
  titulo: {
    fontSize: 32,
    fontWeight: "800",
    color: "#284066",
    textAlign: "center",
    marginTop: 12,
  },
  form: { marginTop: 40, gap: 20 },
  botao: {
    height: 56,
    width: "75%",
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: "#284066",
    alignItems: "center",
    justifyContent: "center",
  },
  botaoTexto: { fontSize: 22, fontWeight: "700", color: "#fff" },
  erro: { color: "#E53935", fontSize: 14, textAlign: "center" },
});
