import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSessao } from "../../Config/sessao";

// Ícone da barra: círculo azul quando a aba está ativa
function IconeAba({ nome, focused }) {
  return (
    <View style={[styles.icone, focused && styles.iconeAtivo]}>
      <Ionicons name={nome} size={26} color={focused ? "#fff" : "#7A7A7A"} />
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { usuario } = useSessao();

  // Sem login, volta para a tela de login (rota "/")
  if (!usuario) return <Redirect href="/" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.barra, { bottom: insets.bottom + 16 }],
        tabBarItemStyle: styles.item,
        tabBarIconStyle: styles.iconeWrapper,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <IconeAba nome="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="agenda"
        options={{
          title: "Agenda",
          tabBarIcon: ({ focused }) => (
            <IconeAba nome="calendar" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="reservas"
        options={{
          title: "Minhas Reservas",
          tabBarIcon: ({ focused }) => (
            <IconeAba nome="list" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <IconeAba nome="person" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="ajuda"
        options={{
          title: "Ajuda",
          tabBarIcon: ({ focused }) => (
            <IconeAba nome="help-circle-outline" focused={focused} />
          ),
        }}
      />

      {/* Fica dentro do grupo para manter a barra visível, mas sem aparecer como aba */}
      <Tabs.Screen name="adicionar-quadra" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  barra: {
    position: "absolute",
    left: 20,
    right: 20,
    height: 72,
    paddingTop: 0,
    paddingBottom: 0, // remove o espaço extra que o React Navigation soma pela safe area
    borderRadius: 36,
    backgroundColor: "#fff",
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  item: {
    height: 72,
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  iconeWrapper: { width: 52, height: 52, margin: 0 },
  icone: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  iconeAtivo: { backgroundColor: "#284066" },
});
