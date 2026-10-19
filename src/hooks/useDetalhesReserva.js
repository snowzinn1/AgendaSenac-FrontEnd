// HOOK: carrega o horário, controla a lista de participantes e confirma a reserva.
import { useCallback, useEffect, useRef, useState } from 'react';
import { buscarHorario } from '../Services/HorarioService';
import { criarReserva } from '../Services/minhasReservasService'; 
import { apenasDigitos, cpfCompleto } from '../Utils/cpf';

export function useDetalhesReserva(horarioId, usuarioId) {
  const [horario, setHorario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Participantes ALÉM do responsável (o responsável é o próprio usuário)
  const [participantes, setParticipantes] = useState([]);
  const proximaChave = useRef(1);

  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState(null);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      setHorario(await buscarHorario(horarioId));
    } catch (e) {
      console.log('Erro ao buscar horário:', e.message, e.config?.url);
      setErro('Não foi possível carregar os dados da reserva.');
    } finally {
      setCarregando(false);
    }
  }, [horarioId]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const adicionar = () =>
    setParticipantes((lista) => [...lista, { chave: proximaChave.current++, nome: '', cpf: '' }]);

  const remover = (chave) =>
    setParticipantes((lista) => lista.filter((p) => p.chave !== chave));

  const atualizar = (chave, campo, valor) =>
    setParticipantes((lista) => lista.map((p) => (p.chave === chave ? { ...p, [campo]: valor } : p)));

  // Devolve true se criou a reserva (a tela usa isso para navegar)
  const confirmar = async () => {
    setErroEnvio(null);

    const incompleto = participantes.some((p) => !p.nome.trim() || !cpfCompleto(p.cpf));
    if (incompleto) {
      setErroEnvio('Preencha nome e CPF completos de todos os participantes, ou remova os vazios.');
      return false;
    }

    try {
      setEnviando(true);
      await criarReserva({
        usuario: { id: usuarioId },
        horario: { id: horario.id },
        participantes: participantes.map((p) => ({ nome: p.nome.trim(), cpf: apenasDigitos(p.cpf) })),
      });
      return true;
    } catch (e) {
      console.log('Erro ao criar reserva:', e.message, e.response?.data);
      setErroEnvio('Não foi possível confirmar o agendamento. Tente novamente.');
      return false;
    } finally {
      setEnviando(false);
    }
  };

  return {
    horario, carregando, erro, recarregar: carregar,
    participantes, adicionar, remover, atualizar,
    enviando, erroEnvio, confirmar,
  };
}