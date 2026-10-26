import { Stack } from 'expo-router';
import { SessaoProvider } from '../Config/sessao';

export default function RootLayout() {
  return (
    <SessaoProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SessaoProvider>
  );
}
