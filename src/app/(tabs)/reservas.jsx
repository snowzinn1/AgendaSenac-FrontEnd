// ROTA /reservas: escolhe a visão pelo tipo de usuário (ALUNO | ADMIN).
// Fica aqui, e não dentro de uma feature, para reservas e check-in não dependerem uma da outra.
import { ehAdmin, useSessao } from '@/features/auth/sessao';
import ReservasAdmin from '@/features/checkin/screens/ReservasAdmin';
import ReservasAluno from '@/features/reservas/screens/ReservasAluno';

export default function ReservasRoute() {
  const { usuario } = useSessao();
  return ehAdmin(usuario) ? <ReservasAdmin /> : <ReservasAluno />;
}