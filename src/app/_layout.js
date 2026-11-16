import { Stack } from 'expo-router';
import { SessaoProvider } from '../features/auth/sessao';

export default function RootLayout() {
  return (
    <SessaoProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SessaoProvider>
  );
}
