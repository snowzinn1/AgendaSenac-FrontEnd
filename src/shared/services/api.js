// Cliente HTTP único do app. Toda chamada ao Spring Boot passa por aqui.
// Configure em .env:  EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:8080
import axios from 'axios';
import Constants from 'expo-constants';

// No celular/simulador o Expo informa o IP do Mac. No navegador pode vir vazio, então usamos localhost.
const host = Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost';

const api = axios.create({
  baseURL: __DEV__
    ? `http://${host}:8080`
    : process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000, // desiste depois de 10 segundos
});

export default api;