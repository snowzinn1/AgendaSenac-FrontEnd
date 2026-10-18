import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { CampoTexto } from "../components/CampoTexto";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const entrar = () => {
    // TODO: chamar o back-end (Spring Boot) para autenticar e guardar token/sessão
    router.replace("/");
  };

  return (
    <View style={styles.tela}>
      <Image
        source={require("../../assets/images/AgendaSenac.png")}
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

        <Pressable
          onPress={entrar}
          style={({ pressed }) => [styles.botao, pressed && { opacity: 0.85 }]}
        >
          <Text style={styles.botaoTexto}>Entrar</Text>
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
});
